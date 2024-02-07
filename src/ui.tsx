import {
  Button,
  Container,
  Muted,
  render,
  Text,
  Textbox,
  VerticalSpace,
  Checkbox
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useState } from 'preact/hooks'

// import { CloseHandler, CreateRectanglesHandler } from './types'

export type CabooseProps = {
  text: string;
  addWhitespace: boolean;
}

function Plugin() {
  const [cabooseText, setCabooseText] = useState("")
  const [addWhitespace, setAddWhitespace] = useState<boolean>(false);

  const handleAppendButtonClick = useCallback(
    function () {
      let cabooseObj = { "text": cabooseText, "addWhitespace": addWhitespace }
      if (cabooseText) {
        emit('APPEND', cabooseObj )
      }
    },
    [cabooseText, addWhitespace]
  )
  
  function handleWhitespace(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked;
    setAddWhitespace(newValue);
  }

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Caboose Text</Muted>
      </Text>
      <VerticalSpace space="small" />
      <Textbox
        onValueInput={setCabooseText}
        value={cabooseText}
        variant="border"
        placeholder="Enter text to append..."
      />
      <VerticalSpace space="small" />
      <Checkbox onChange={handleWhitespace} value={addWhitespace}>
        <Text>Add preceding whitespace</Text>
      </Checkbox>
      <VerticalSpace space="large" />
      <Button fullWidth onClick={handleAppendButtonClick}>
          Append text to selected stickies
      </Button>
      
      <VerticalSpace space="medium" />
    </Container>
  )
}

export default render(Plugin)
