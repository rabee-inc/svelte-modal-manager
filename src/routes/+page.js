export async function load({fetch}) {
  let res = await fetch('https://jsonplaceholder.typicode.com/posts');
  let json = await res.json();

  return {
    posts: json,
  }
}