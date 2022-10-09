/* eslint-disable newline-before-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import ObsClient from 'esdk-obs-nodejs'
// import { TObsClientInput } from '../interfaces'

// export class ObsAdapter {
//     private obs: typeof ObsClient

//     private bucketName: string

//     constructor({
//         access_key_id,
//         secret_access_key,
//         server,
//         bucketName,
//     }: TObsClientInput) {
//         this.bucketName = bucketName
//         this.obs = new ObsClient({
//             access_key_id,
//             secret_access_key,
//             server,
//         })
//     }

//     async initBucket(): Promise<unknown> {
//         const bucketInstance = await new Promise((resolve, reject) => {
//             this.obs.createBucket({
//                 Bucket: this.bucketName,
//             }, (err: any, result: any): void => {
//                 if(err) {
//                     reject(`Error occurred: ${err}`)
//                 } else {
//                     resolve(result.CommonMsg.Status)
//                 }
//             })
//         })
//         return bucketInstance
//     }

//     async getConfigContent(objectKey: string): Promise<unknown> {
//         const configContent = await new Promise((resolve, reject) => {
//             this.obs.getObject({
//                 Bucket: this.bucketName,
//                 Key: objectKey,
//             }, (err: any, result: any) => {
//                 if(err) {
//                     reject(`Error occurred: ${err}`)
//                 } else {
//                     resolve(result.InterfaceResult.Content.toString())
//                 }
//             })
//         })
//         return configContent
//     }
// }
