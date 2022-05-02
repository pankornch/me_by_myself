import React, { FC } from "react"
import NextImage from "next/image"

interface Props {
	className?: string
	src: string
	alt?: string
	objectFit?: any
}

const Image: FC<Props> = (props) => {
	return (
		<div className={props.className}>
			<NextImage
				src={props.src}
				// loader={({ src }) => src}
				alt={props.alt}
				objectFit={props.objectFit || "cover"}
				layout="fill"
			/>
		</div>
	)
}

export default Image
