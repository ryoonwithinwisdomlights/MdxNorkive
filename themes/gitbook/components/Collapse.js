import React, { useEffect, useImperativeHandle } from 'react'

/**
 * Folding panel component, supports horizontal folding and vertical folding
 * @param {type:['horizontal','vertical'],isOpen} props
 * @returns
 */
const Collapse = props => {
  const { collapseRef } = props
  const ref = React.useRef(null)
  const type = props.type || 'vertical'

  useImperativeHandle(collapseRef, () => {
    return {
      /**
       * When the height of the child element changes,
       *  this method can be called to update the height
       * of the collapsed component.
       * @param {*} param0
       */
      updateCollapseHeight: ({ height, increase }) => {
        ref.current.style.height = ref.current.scrollHeight
        ref.current.style.height = 'auto'
      }
    }
  })

  /**
   * fold
   * @param {*} element
   */
  const collapseSection = element => {
    const sectionHeight = element.scrollHeight
    const sectionWidth = element.scrollWidth

    requestAnimationFrame(function () {
      switch (type) {
        case 'horizontal':
          element.style.width = sectionWidth + 'px'
          requestAnimationFrame(function () {
            element.style.width = 0 + 'px'
          })
          break
        case 'vertical':
          element.style.height = sectionHeight + 'px'
          requestAnimationFrame(function () {
            element.style.height = 0 + 'px'
          })
      }
    })
  }

  /**
   * Expand
   * @param {*} element
   */
  const expandSection = element => {
    const sectionHeight = element.scrollHeight
    const sectionWidth = element.scrollWidth
    let clearTime = 0
    switch (type) {
      case 'horizontal':
        element.style.width = sectionWidth + 'px'
        clearTime = setTimeout(() => {
          element.style.width = 'auto'
        }, 400)
        break
      case 'vertical':
        element.style.height = sectionHeight + 'px'
        clearTime = setTimeout(() => {
          element.style.height = 'auto'
        }, 400)
    }

    clearTimeout(clearTime)
  }

  useEffect(() => {
    if (props.isOpen) {
      expandSection(ref.current)
    } else {
      collapseSection(ref.current)
    }
    // Notify parent component of height change
    props?.onHeightChange &&
      props.onHeightChange({
        height: ref.current.scrollHeight,
        increase: props.isOpen
      })
  }, [props.isOpen])

  return (
    <div
      ref={ref}
      style={
        type === 'vertical'
          ? { height: '0px', willChange: 'height' }
          : { width: '0px', willChange: 'width' }
      }
      className={`${props.className || ''} overflow-hidden duration-200 `}
    >
      {props.children}
    </div>
  )
}
Collapse.defaultProps = { isOpen: false }

export default Collapse
