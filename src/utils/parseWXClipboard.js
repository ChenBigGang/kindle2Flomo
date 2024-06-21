// 解析微信读书粘贴板
import { dexieGet, dexieAdd } from "@/db/dexie";
import md5 from "md5";
import init from "@/utils/init.js";

const notePattern =
  /◆ (\d{4}\/\d{2}\/\d{2})发表想法\n{2}([\S\n]*)\n{2}原文：([\S ]*)/g;
const linePattern = /◆ (?!\d{4}\/\d{2}\/\d{2})([\S ]*)/g;
const bookPattern = /《(\S*)》\s{2}(\S*)\s{1}(\d*)个笔记/g;

async function parseBook(str) {
  try {
    const matchResult = [...str.matchAll(bookPattern)];
    if (matchResult.length > 1 || matchResult.length === 0) {
      return false;
    }
    const bookName = matchResult[0][1];
    const authorName = matchResult[0][2];
    const uuid = md5(bookName);
    let bookInfo = {
      uuid,
      book: bookName,
      title: bookName,
      from: "weread",
    };
    const res = await dexieGet(uuid, "books");
    if (!res) {
      await dexieAdd(bookInfo, "books");
    }
    return bookInfo;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function parseNote(bookInfo, str) {
  const bookName = bookInfo.title;
  // 匹配笔记+划线
  const notes = [...str.matchAll(notePattern)].map((match) => {
    return {
      note: match[2],
      text: match[3],
    };
  });
  // 匹配仅划线
  const lines = [...str.matchAll(linePattern)].map((match) => {
    return {
      text: match[1],
    };
  });
  notes.push(...lines);
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const uuid = md5(`${bookName}${note.text}${note.note ? note.note : ""}`);
    let noteItem = {
      uuid,
      title: bookName,
      text: note.text,
      note: note.note,
      content_update: "",
      uploaded: false,
      from: "weread",
    };
    const res = await dexieGet(uuid);
    if (!res) {
      await dexieAdd(noteItem);
    }
  }
}

export default async function parseWXClipboard(str) {
  const bookInfo = await parseBook(str);
  await parseNote(bookInfo, str);
  await init([bookInfo.title]);
  return true;
}
