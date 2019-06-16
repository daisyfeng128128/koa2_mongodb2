function findData (){
  return new Promise((resolve, reject) => {
    setTimeout(()=> resolve("long_time_value"), 1000)
  })
}
async function test (){
  const v = await findData();
  console.log(v)
}
test();