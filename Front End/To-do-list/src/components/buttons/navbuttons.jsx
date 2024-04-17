const Navbuttons = ({text, link}) => {
  return (
    <a className="px-4 py-2 w-full bg-white/20 rounded" href={link||"#"}>
        {text}
    </a>
  )
}
export default Navbuttons