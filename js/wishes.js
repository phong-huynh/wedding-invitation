function toLocalTime(date) {
  return Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}

async function sendWishes(_payload) {
  try {
    const _sheet =
      "https://script.google.com/macros/s/AKfycbwpFLAwP9FHA8sz6MOuKSomTPmQSgz3jM91wnbU_l0UtGYL3oFeZHUJIy2d71-U2zxBgQ/exec";

    return await fetch(_sheet, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: new URLSearchParams({
        action: "wishes",
        GuestName: _payload?.guestName,
        Wishes: _payload?.wishes,
        CreatedAt: toLocalTime(new Date()),
      }),
    });
  } catch (error) {
    throw error;
  }
}
