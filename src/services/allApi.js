import { base_url } from "./baseUrl"
import { commonAPI } from "./commonApi"
//register
export const registerAPI = async(user)=>{
    return await commonAPI("POST",`${base_url}/user/register`,user,"")
}
//login
export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${base_url}/user/login`,user,"")
}

//addpost
export const addPostAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${base_url}/post/add`,reqBody,reqHeader)
}
//user-posts
export const userPostAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${base_url}/user/user-posts`,"",reqHeader)

}

export const  deletePostAPI = async(projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${base_url}/user/remove/${projectId}`,{},reqHeader)
}

export const updateUserAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${base_url}/user/edit`,reqBody,reqHeader)
}