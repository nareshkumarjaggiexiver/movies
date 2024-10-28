import * as React from "react"
const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M14 11v3H2v-3H0v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2Zm-1-4-1.41-1.41L9 8.17V0H7v8.17L4.41 5.59 3 7l5 5 5-5Z"
    />
  </svg>
)
export default UploadIcon
