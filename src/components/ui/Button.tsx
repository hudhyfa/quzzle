export default function Button({
  title,
  color,
  bgColor,
}: {
  title: string;
  color: string;
  bgColor: string;
}) {
  const buttonStyle = {
    width: "auto",
    color: `${color}`,
    backgroundColor: `${bgColor}`,
    padding: "10px 20px",
    borderRadius: "50px"
  };
  return <button style={buttonStyle}>{title}</button>;
}
