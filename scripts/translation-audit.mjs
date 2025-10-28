import fs from "fs"
import path from "path"

const root = "/home/kane16/Documents/it-projects/portfolio-client"
const srcDir = path.join(root, "src")
const localesDir = path.join(root, "src/locales")
const translationPath = path.join(localesDir, "en/translation.json")

const translation = JSON.parse(fs.readFileSync(translationPath, "utf8"))

function flatten(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    const composedKey = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return flatten(value, composedKey)
    }
    return composedKey
  })
}

const translationKeys = new Set(flatten(translation))

const files = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(full)
    }
  }
}

walk(srcDir)

const keyRegex = /\bt\(\s*["'`]([^"'`]+?)["'`]\s*(?:,|\))/g
const i18nRegex = /i18n\.t\(\s*["'`]([^"'`]+?)["'`]\s*(?:,|\))/g
const codeKeys = new Set()

for (const file of files) {
  const content = fs.readFileSync(file, "utf8")
  for (const regex of [keyRegex, i18nRegex]) {
    regex.lastIndex = 0
    let match
    while ((match = regex.exec(content))) {
      codeKeys.add(match[1])
    }
  }
}

const missing = [...codeKeys].filter((key) => !translationKeys.has(key)).sort()
const unused = [...translationKeys].filter((key) => !codeKeys.has(key)).sort()

console.log(JSON.stringify({ missing, unused }, null, 2))
