import { IResolverType } from "../../../type"
import * as user from "./user"
import * as question from "./question"
import resolverBuilder from "../../utils/resolverBuilder"

const resolvers: IResolverType = resolverBuilder(user, question)

export default resolvers
