export async function load({params, fetch}) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  let json = await res.json();

  return {
    post: json,
  }
}