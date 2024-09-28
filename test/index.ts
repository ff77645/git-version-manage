// import {init,checkVersion} from '../dist/index'
// const {init,checkVersion} = require('../dist/index.js')
import "dotenv/config";
import {
  init,
  checkVersion,
  createRelease,
  deleteRelease,
  showList,
} from "../index";

const env: any = process.env;

async function main() {
  init({
    repositoryId: env.repositoryId,
    accessToken: env.accessToken,
    organizationId: env.organizationId,
    accessKeySecret: env.accessKeySecret,
    accessKeyId: env.accessKeyId,
  });

  // await createRelease({versionName:'1.1.1',message:{title:'测试','url':'123',platform:'android'}})
  // await deleteRelease({
  //   versionName:'1.1.1',
  //   platform:'android'
  // })

  // const res =await checkVersion({
  //   currentVersion:'1.0',
  //   platform:'android'
  // })

  const res = await showList();

  console.log({ res });
}

main();
