import s from "./StarRating.style.css"

function StarRating({count, value,
    inactiveColor='var(--color)',
    size=24,
    activeColor='#478A70', changeRate}) {

  // short trick
  const stars = Array.from({length: count}, () => '🟊')

  // Internal handle change function
  // const handleChange = (value) => {
  //   onChange(value + 1);
  // }

  return (
    <div>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style=activeColor;
        }
        return (
          <span className={s.star}
            key={index}
            style={{color: style, width:size, height:size, fontSize: size, cursor: "pointer"}}
            onClick={ () => changeRate(index + 1) }>{s}</span>
        )
      })}
    </div>
  )
}

export default StarRating