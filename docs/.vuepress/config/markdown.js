
module.exports = {
  // markdown-it-anchor 的选项
  anchor: {
    permalink: true
  },
  toc: { 
    includeLevel: [1, 2, 3]
  },
  lineNumbers: false,
  extendMarkdown: md => {
    // 使用更多的 markdown-it 插件!
    md.use(require('markdown-it-sup'))
  },
}
