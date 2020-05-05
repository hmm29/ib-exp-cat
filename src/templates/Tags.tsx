import * as React from 'react'

const style: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#8855FF',
  background: 'rgba(136, 85, 255, 0.1)',
  overflow: 'hidden',
}

// Define type of property
interface Props {
  text?: string
  padding?: number
  paddingPerSide?: boolean
  paddingTop?: number
  paddingRight?: number
  paddingBottom?: number
  paddingLeft?: number
  fontWeight?: number
  fontSize?: number
  fontColor?: string
  margin?: number
  bgColor?: string
  align?: string
  borderSize?: number
  borderColor?: string
  borderRadius?: number
  tags?: string
  tagState?: string
  separator?: string
  hoverbgColor?: string
  disablebgColor?: string
  disablefontColor?: string
  disableborderColor?: string
  hoverfontColor?: string
  hoverborderColor?: string
  downbgColor?: string
  downfontColor?: string
  downborderColor?: string
  justifyContent?: string
}

export class Tags extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    //Font weight of the tags
    fontWeight: 500,
    //Font size of the tags
    fontSize: 16,
    //Margin between the tags
    margin: 4,
    //Background color of the tags
    bgColor: '#000000',
    hoverbgColor: '#FAE900',
    downbgColor: '#FAC000',
    disablebgColor: '#EDEDED',
    //Font color of the tags
    fontColor: '#ffffff',
    hoverfontColor: '#000000',
    downfontColor: '#000000',
    disablefontColor: '#8F8F8F',
    //Component alignment
    align: 'Center',
    //Border radius of the tags
    borderSize: 1,
    //Border color of the tags
    borderColor: 'rgba(0,0,0,0)',
    hoverborderColor: '#DACC07',
    downborderColor: 'rgba(0,0,0,0)',
    disableborderColor: 'rgba(0,0,0,0)',
    //Radius of the tags
    borderRadius: 100,
    //Paddings
    padding: 0,
    paddingPerSide: true,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    //Tags list
    tags: 'Design, UI, UX, FramerX, Prototyping, Motion, Illustration',
    //Separator
    separator: ',',
    tagState: 'state1',
  }

  mouseEnter(event) {
    if (this.props.tagState != 'state4') {
      event.currentTarget.style.transition =
        'background-color 0.25s, color 0.25s, border-color 0.25s'
      event.currentTarget.style.backgroundColor = this.props.hoverbgColor
      event.currentTarget.style.color = this.props.hoverfontColor
      event.currentTarget.style.borderColor = this.props.hoverborderColor
    }
  }

  mouseLeave(event) {
    if (this.props.tagState != 'state4') {
      event.currentTarget.style.backgroundColor = this.props.bgColor
      event.currentTarget.style.color = this.props.fontColor
      event.currentTarget.style.borderColor = this.props.borderColor
    }
  }

  mouseDown(event) {
    if (this.props.tagState != 'state4') {
      event.currentTarget.style.backgroundColor = this.props.downbgColor
      event.currentTarget.style.color = this.props.downfontColor
      event.currentTarget.style.borderColor = this.props.downborderColor
    }
  }

  mouseUp(event) {
    if (this.props.tagState != 'state4') {
      event.currentTarget.style.backgroundColor = this.props.hoverbgColor
      event.currentTarget.style.color = this.props.hoverfontColor
      event.currentTarget.style.borderColor = this.props.hoverborderColor
    }
  }

  render() {
    var titleArray = this.props.tags ? this.props.tags.split(this.props.separator) : []
    var tagArray = []
    var cursor_state = 'pointer'
    var tagFontColor = this.props.fontColor
    var tagBgColor = this.props.bgColor
    var tagBorderColor = this.props.borderColor

    for (var i = 0; i < titleArray.length; i++) {
      if (titleArray[i] == '') {
        titleArray[i] = 'Tag'
      }

      if (this.props.tagState == 'state4') {
        cursor_state = 'default'
        tagBgColor = this.props.disablebgColor
        tagFontColor = this.props.disablefontColor
        tagBorderColor = this.props.disableborderColor
      }

      if (this.props.paddingPerSide) {
        tagArray.push(
          <button
            type="button"
            className="square"
            key={i}
            onMouseEnter={e => this.mouseEnter(e)}
            onMouseLeave={e => this.mouseLeave(e)}
            onMouseDown={e => this.mouseDown(e)}
            onMouseUp={e => this.mouseUp(e)}
            style={{
              borderStyle: 'solid',
              cursor: cursor_state,
              borderWidth: this.props.borderSize,
              borderColor: tagBorderColor,
              borderRadius: this.props.borderRadius,
              color: tagFontColor,
              background: tagBgColor,
              fontSize: this.props.fontSize,
              fontWeight: this.props.fontWeight,
              margin: this.props.margin,
              paddingLeft: this.props.paddingLeft,
              paddingRight: this.props.paddingRight,
              paddingTop: this.props.paddingTop,
              paddingBottom: this.props.paddingBottom,
              display: 'flex',
            }}
          >
            {titleArray[i]}
          </button>,
        )
      } else {
        tagArray.push(
          <button
            type="button"
            className="square"
            key={i}
            onMouseEnter={e => this.mouseEnter(e)}
            onMouseLeave={e => this.mouseLeave(e)}
            onMouseDown={e => this.mouseDown(e)}
            onMouseUp={e => this.mouseUp(e)}
            style={{
              borderStyle: 'solid',
              cursor: cursor_state,
              borderWidth: this.props.borderSize,
              borderColor: tagBorderColor,
              borderRadius: this.props.borderRadius,
              color: tagFontColor,
              background: tagBgColor,
              fontSize: this.props.fontSize,
              margin: this.props.margin,
              padding: this.props.padding,
            }}
          >
            {titleArray[i]}
          </button>,
        )
      }
    }

    return <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: this.props.justifyContent || 'flex-start' }}>{tagArray}</div>
  }
}
