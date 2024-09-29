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
    owner:env.owner,
    repo:env.repo,
    access_token:env.access_token,
    ref:'main'
  });

  await createRelease({versionName:'1.2.2',body:{title:'测试',url:'123',platform:'android'}})
  // await deleteRelease({
  //   id:438260,
  // })

  const res =await checkVersion({
    currentVersion:'1.0.2',
  })

  // const res = await showList();

  console.log({ res });
}

main();
