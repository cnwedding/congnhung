export async function onRequest(context: any) {
    const { request, params, env } = context;

    const slug = params.slug || "";
    const name = decodeURIComponent(slug);

    // Lấy HTML gốc từ static (Vite build)
    const res = await env.ASSETS.fetch(request);
    let html = await res.text();

    const title = `Thiệp cưới gửi ${name}`;
    const description = `Trân trọng kính mời ${name} đến chung vui cùng chúng tôi 💍`;
    const url = `https://congnhung.pages.dev/invite/${slug}`;
    const image = `https://congnhung.pages.dev/preview.jpg`;

    // Inject meta (replace placeholder)
    html = html
        .replace(/__OG_TITLE__/g, escapeHtml(title))
        .replace(/__OG_DESC__/g, escapeHtml(description))
        .replace(/__OG_URL__/g, url)
        .replace(/__OG_IMAGE__/g, image);

    return new Response(html, {
        headers: {
            "content-type": "text/html; charset=UTF-8",
        },
    });
}

// tránh lỗi ký tự tiếng Việt trong HTML
function escapeHtml(str: string) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}