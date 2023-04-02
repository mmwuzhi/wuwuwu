export default function isMobile() {
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile
  } else {
    return window.matchMedia('(any-pointer:coarse)').matches
  }
}
