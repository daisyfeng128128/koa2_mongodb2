async function testAsync (){
  return `hello async`;
}
function getData (){
  return `zhangsan`;
}
async function test (){
  const v1 = await getData();
  const v2 = await testAsync();
  console.log(v2, v1)
}
test();