import { gql } from "apollo-server-core"
import Input from "./gql/Input"
import Mutation from "./gql/Mutation"
import Query from "./gql/Query"
import Types from "./gql/Types"

export default gql`
	${Query}
	${Types}
	${Mutation}
	${Input}
`
