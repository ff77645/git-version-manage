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
import {compareVersion} from '../helper'

const env: any = process.env;

async function main() {
  init({
    owner:env.owner,
    repo:env.repo,
    access_token:env.access_token,
    ref:'version'
  });

  // await createRelease({versionName:'1.2.2',body:{title:'测试',url:'123',platform:'android'}})
  // await deleteRelease({
  //   id:438260,
  // })

  // const res =await checkVersion({
  //   currentVersion:'1.0.0',
  // })

  // const res = await showList();

  // console.log({ res });
  const d = compareVersion('1.0.0','1.0.1')
  console.log({d});
  
}

main();
