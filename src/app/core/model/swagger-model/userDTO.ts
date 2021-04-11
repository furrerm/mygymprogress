/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface UserDTO { 
    id?: number;
    uid?: string;
    email?: string;
    emailVerified?: boolean;
    name?: string;
    pictureUrl?: string;
    pictureUrlSmall?: string;
    profileImage?: string;
    profileImageSmall?: string;
    issuer?: string;
    firstSignIn?: boolean;
    follows?: Array<UserDTO>;
    followers?: Array<UserDTO>;
}