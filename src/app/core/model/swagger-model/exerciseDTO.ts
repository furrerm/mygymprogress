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
import { ExerciseSetContainerDTO } from './exerciseSetContainerDTO';
import { FilterGroupDTO } from './filterGroupDTO';

export interface ExerciseDTO { 
    id?: number;
    name?: string;
    setsContainer?: Array<ExerciseSetContainerDTO>;
    order?: number;
    videoUrl?: string;
    image?: string;
    userEntryRequired?: boolean;
    timeLength?: number;
    timeBased?: boolean;
    weight?: boolean;
    filterGroups?: Array<FilterGroupDTO>;
}