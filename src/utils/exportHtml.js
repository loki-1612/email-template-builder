
export function generateEmailHTML(blocks) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email</title>
  </head>
  <body style="font-family: Arial, sans-serif;">
    ${blocks
      .map((block) => {
        if (block.type === "text") {
          return `<p>${block.content}</p>`;
        }

        if (block.type === "image") {
          return `<img src="${block.content}" style="max-width:100%; display:block; margin:16px 0;" />`;
        }

        if (block.type === "button") {
          return `<a href="#" style="display:inline-block;padding:10px 16px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">
            ${block.content}
          </a>`;
        }

        return "";
      })
      .join("")}
  </body>
</html>
  `;
}