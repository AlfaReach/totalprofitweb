import React from "react"

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return <React.Fragment key={index}>{part}</React.Fragment>
  })
}

export function MarkdownArticle({ content }: { content: string }) {
  const lines = content.trim().split("\n")
  const elements: React.ReactNode[] = []
  let paragraph: string[] = []
  let list: string[] = []
  let key = 0

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim()
    if (text) elements.push(<p key={key++} className="leading-8 text-foreground/80">{renderInline(text)}</p>)
    paragraph = []
  }
  const flushList = () => {
    if (list.length) {
      elements.push(
        <ul key={key++} className="space-y-2 pl-5 text-foreground/80">
          {list.map((item) => <li key={item} className="list-disc leading-7">{renderInline(item)}</li>)}
        </ul>
      )
    }
    list = []
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      flushParagraph(); flushList(); continue
    }
    if (line.startsWith("### ")) {
      flushParagraph(); flushList()
      elements.push(<h3 key={key++} className="pt-3 text-xl font-semibold tracking-tight">{line.slice(4)}</h3>)
    } else if (line.startsWith("## ")) {
      flushParagraph(); flushList()
      elements.push(<h2 key={key++} className="pt-5 text-2xl font-bold tracking-tight sm:text-3xl">{line.slice(3)}</h2>)
    } else if (/^[-*] /.test(line)) {
      flushParagraph(); list.push(line.slice(2))
    } else {
      flushList(); paragraph.push(line)
    }
  }
  flushParagraph(); flushList()

  return <div className="space-y-6">{elements}</div>
}

export function HtmlArticle({ html }: { html: string }) {
  return <div className="article-html" dangerouslySetInnerHTML={{ __html: html }} />
}
