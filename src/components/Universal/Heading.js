import './../../css/Universal/Heading.css'

function Heading({title, color, background, customClass, event, children}) {
  return (
    <h1 className={customClass} style={{color: color, background: background}}>{title} {children}</h1>
  )
}

export default Heading
