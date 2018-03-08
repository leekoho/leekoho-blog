/**
 * Created by leekoho on 2018/1/25.
 */
import Vue from 'vue'
import Marked from 'marked'
// 默认引用'highlight/index.js' 这个文件打包出来的太大了, 会把lib/languages/目录下所有文件引进来
import Highlight from 'highlight.js/lib/highlight'
import 'highlight.js/styles/monokai-sublime.css'
const languages = ['bash', 'css', 'markdown', 'http', 'javascript', 'json', 'nginx', 'python', 'scss', 'sass', 'less', 'stylus']

Highlight.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
Highlight.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
Highlight.registerLanguage('js', require('highlight.js/lib/languages/javascript'))
Highlight.registerLanguage('css', require('highlight.js/lib/languages/css'))
Highlight.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
Highlight.registerLanguage('sass', require('highlight.js/lib/languages/scss'))
Highlight.registerLanguage('less', require('highlight.js/lib/languages/less'))
Highlight.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'))
Highlight.registerLanguage('python', require('highlight.js/lib/languages/python'))
Highlight.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
Highlight.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
Highlight.registerLanguage('json', require('highlight.js/lib/languages/json'))

// Highlight.configure({
//   classPrefix: ''     // don't append class prefix
// })

Marked.setOptions({
  renderer: new Marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight: (code, lang) => {
    if (!~languages.indexOf(lang)) {
      return Highlight.highlightAuto(code).value
    }
    return Highlight.highlight(lang, code).value
  }
})

Vue.prototype.md = Marked
