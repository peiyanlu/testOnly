const getOffsetLeft = (dom: HTMLElement) => {
  let offsetLeft = dom.offsetLeft
  let parent = dom.offsetParent as (HTMLElement | null)
  while (parent) {
    offsetLeft += parent.offsetLeft
    parent = parent.offsetParent as (HTMLElement | null)
  }
  return offsetLeft
}

const getOffsetTop = (dom: HTMLElement) => {
  let offsetTop = dom.offsetTop
  let parent = dom.offsetParent as (HTMLElement | null)
  while (parent) {
    offsetTop += parent.offsetTop
    parent = parent.offsetParent as (HTMLElement | null)
  }
  return offsetTop
}
