export default function DropDowPair({
	title,
	name,
	value,
	text,
	value2,
	text2,
	imperial,
}) {
	return (
		<>
			<div className="inpt-group">
				<h4>{title}</h4>
				<div className="inpt-div">
					<input
						type={"radio"}
						name={name}
						id={value}
						checked={imperial ? false : true}
						onChange={() => ''}
					/>
					<label htmlFor={value}>{text}</label>
				</div>
				<div className="inpt-div">
					<input
						type={"radio"}
						name={name}
						id={value2}
						checked={imperial ? true : false}
						onChange={() => ''}
					/>
					<label htmlFor={value2}>{text2}</label>
				</div>
				<hr className="hr" />
			</div>
		</>
	)
}
