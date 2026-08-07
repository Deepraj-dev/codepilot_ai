import { Icon, type IconifyIcon } from "@iconify/react/offline";
import angularIcon from "@iconify-icons/vscode-icons/file-type-angular";
import archiveIcon from "@iconify-icons/vscode-icons/file-type-zip";
import audioIcon from "@iconify-icons/vscode-icons/file-type-audio";
import binaryIcon from "@iconify-icons/vscode-icons/file-type-binary";
import cIcon from "@iconify-icons/vscode-icons/file-type-c3";
import cppIcon from "@iconify-icons/vscode-icons/file-type-cpp3";
import cppHeaderIcon from "@iconify-icons/vscode-icons/file-type-cppheader";
import csharpIcon from "@iconify-icons/vscode-icons/file-type-csharp2";
import cssIcon from "@iconify-icons/vscode-icons/file-type-css";
import dartIcon from "@iconify-icons/vscode-icons/file-type-dartlang";
import defaultIcon from "@iconify-icons/vscode-icons/default-file";
import dockerIcon from "@iconify-icons/vscode-icons/file-type-docker2";
import dotenvIcon from "@iconify-icons/vscode-icons/file-type-dotenv";
import excelIcon from "@iconify-icons/vscode-icons/file-type-excel";
import gitIcon from "@iconify-icons/vscode-icons/file-type-git";
import goIcon from "@iconify-icons/vscode-icons/file-type-go";
import graphqlIcon from "@iconify-icons/vscode-icons/file-type-graphql";
import htmlIcon from "@iconify-icons/vscode-icons/file-type-html";
import imageIcon from "@iconify-icons/vscode-icons/file-type-image";
import javaIcon from "@iconify-icons/vscode-icons/file-type-java";
import javascriptIcon from "@iconify-icons/vscode-icons/file-type-js-official";
import jsonIcon from "@iconify-icons/vscode-icons/file-type-json-official";
import kotlinIcon from "@iconify-icons/vscode-icons/file-type-kotlin";
import lessIcon from "@iconify-icons/vscode-icons/file-type-less";
import luaIcon from "@iconify-icons/vscode-icons/file-type-lua";
import markdownIcon from "@iconify-icons/vscode-icons/file-type-markdown";
import nextIcon from "@iconify-icons/vscode-icons/file-type-next";
import nodeIcon from "@iconify-icons/vscode-icons/file-type-node";
import npmIcon from "@iconify-icons/vscode-icons/file-type-npm";
import pdfIcon from "@iconify-icons/vscode-icons/file-type-pdf2";
import phpIcon from "@iconify-icons/vscode-icons/file-type-php3";
import pnpmIcon from "@iconify-icons/vscode-icons/file-type-pnpm";
import pythonIcon from "@iconify-icons/vscode-icons/file-type-python";
import reactIcon from "@iconify-icons/vscode-icons/file-type-reactjs";
import reactTypeScriptIcon from "@iconify-icons/vscode-icons/file-type-reactts";
import rubyIcon from "@iconify-icons/vscode-icons/file-type-ruby";
import rustIcon from "@iconify-icons/vscode-icons/file-type-rust";
import sassIcon from "@iconify-icons/vscode-icons/file-type-sass";
import scssIcon from "@iconify-icons/vscode-icons/file-type-scss";
import shellIcon from "@iconify-icons/vscode-icons/file-type-shell";
import sqlIcon from "@iconify-icons/vscode-icons/file-type-sql";
import sqliteIcon from "@iconify-icons/vscode-icons/file-type-sqlite";
import svelteIcon from "@iconify-icons/vscode-icons/file-type-svelte";
import swiftIcon from "@iconify-icons/vscode-icons/file-type-swift";
import textIcon from "@iconify-icons/vscode-icons/file-type-text";
import tomlIcon from "@iconify-icons/vscode-icons/file-type-toml";
import typeScriptIcon from "@iconify-icons/vscode-icons/file-type-typescript-official";
import videoIcon from "@iconify-icons/vscode-icons/file-type-video";
import vueIcon from "@iconify-icons/vscode-icons/file-type-vue";
import xmlIcon from "@iconify-icons/vscode-icons/file-type-xml";
import yamlIcon from "@iconify-icons/vscode-icons/file-type-yaml";

const extensionIcons: Record<string, IconifyIcon> = {
  "7z": archiveIcon,
  aac: audioIcon,
  avi: videoIcon,
  bash: shellIcon,
  bin: binaryIcon,
  bmp: imageIcon,
  bz2: archiveIcon,
  c: cIcon,
  cc: cppIcon,
  cjs: javascriptIcon,
  cpp: cppIcon,
  cs: csharpIcon,
  css: cssIcon,
  csv: excelIcon,
  cts: typeScriptIcon,
  dart: dartIcon,
  db: sqliteIcon,
  doc: textIcon,
  docx: textIcon,
  fish: shellIcon,
  flac: audioIcon,
  gif: imageIcon,
  go: goIcon,
  graphql: graphqlIcon,
  gql: graphqlIcon,
  gz: archiveIcon,
  h: cppHeaderIcon,
  hpp: cppHeaderIcon,
  htm: htmlIcon,
  html: htmlIcon,
  ico: imageIcon,
  java: javaIcon,
  jpeg: imageIcon,
  jpg: imageIcon,
  js: javascriptIcon,
  json: jsonIcon,
  jsonc: jsonIcon,
  jsx: reactIcon,
  kt: kotlinIcon,
  kts: kotlinIcon,
  less: lessIcon,
  lua: luaIcon,
  m4a: audioIcon,
  md: markdownIcon,
  mdx: markdownIcon,
  mjs: javascriptIcon,
  mkv: videoIcon,
  mov: videoIcon,
  mp3: audioIcon,
  mp4: videoIcon,
  mts: typeScriptIcon,
  ods: excelIcon,
  ogg: audioIcon,
  pdf: pdfIcon,
  php: phpIcon,
  png: imageIcon,
  prisma: sqliteIcon,
  ps1: shellIcon,
  py: pythonIcon,
  rar: archiveIcon,
  rb: rubyIcon,
  rs: rustIcon,
  sass: sassIcon,
  scss: scssIcon,
  sh: shellIcon,
  sql: sqlIcon,
  sqlite: sqliteIcon,
  sqlite3: sqliteIcon,
  svelte: svelteIcon,
  svg: imageIcon,
  swift: swiftIcon,
  tar: archiveIcon,
  tgz: archiveIcon,
  toml: tomlIcon,
  ts: typeScriptIcon,
  tsv: excelIcon,
  tsx: reactTypeScriptIcon,
  txt: textIcon,
  vue: vueIcon,
  wav: audioIcon,
  webm: videoIcon,
  webp: imageIcon,
  xls: excelIcon,
  xlsx: excelIcon,
  xml: xmlIcon,
  yaml: yamlIcon,
  yml: yamlIcon,
  zip: archiveIcon,
  zsh: shellIcon,
};

const filenameIcons: Record<string, IconifyIcon> = {
  ".dockerignore": dockerIcon,
  ".env": dotenvIcon,
  ".gitignore": gitIcon,
  ".nvmrc": nodeIcon,
  "angular.json": angularIcon,
  "dockerfile": dockerIcon,
  "next.config.js": nextIcon,
  "next.config.mjs": nextIcon,
  "next.config.ts": nextIcon,
  "package-lock.json": npmIcon,
  "package.json": npmIcon,
  "pnpm-lock.yaml": pnpmIcon,
};

function fileExtension(name: string) {
  const normalizedName = name.trim().toLocaleLowerCase();
  if (!normalizedName || !normalizedName.includes(".")) return "";
  return normalizedName.split(".").at(-1) ?? "";
}

export function FileTypeIcon({ name }: { name: string }) {
  const normalizedName = name.trim().toLocaleLowerCase();
  const icon = filenameIcons[normalizedName] ?? extensionIcons[fileExtension(normalizedName)] ?? defaultIcon;

  return <Icon icon={icon} width={15} height={15} data-file-type-icon />;
}
