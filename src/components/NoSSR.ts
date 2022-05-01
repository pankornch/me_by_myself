import dynamic from "next/dynamic"

const NoSSR = (component: any) => {
	return dynamic(() => Promise.resolve(component), { ssr: false })
}

export default NoSSR
