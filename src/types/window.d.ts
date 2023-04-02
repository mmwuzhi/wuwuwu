type Brand = {
  readonly brand: string
  readonly version: string
}

type NavigatorUAData = {
  readonly brands: Brand[]
  readonly mobile: boolean
  readonly platform: string
}

interface Navigator {
  /** not support on firefox, safari, and webview android */
  userAgentData?: NavigatorUAData
}
