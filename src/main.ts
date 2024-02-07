import { once, showUI } from '@create-figma-plugin/utilities'
import { CabooseProps }  from './ui'

export default function () {
  once('APPEND', async function (cabooseObj: CabooseProps) {
    let appendText = ""
    
    if (cabooseObj.addWhitespace) {
      appendText += " "
    }

    appendText += cabooseObj.text

    let selected = figma.currentPage.selection

    for (let i = 0; i < selected.length; i++) {
      if (selected[i].type === "STICKY") {
        let stickyNode = selected[i] as StickyNode
      
        if (stickyNode.text.characters) {
          let font = stickyNode.text.getRangeFontName(stickyNode.text.characters.length-1, stickyNode.text.characters.length) as FontName
          await figma.loadFontAsync(font)
        } else {
          await figma.loadFontAsync({ family: 'Inter', style: 'Medium' })
          
        }
        stickyNode.text.characters += appendText
      }
    }

    figma.closePlugin()
  })

  showUI({
    height: 160,
    width: 250
  })
}
