function formatVietnamesePhoneNumber(phone) {
  if (!phone) return "";

  let _cleaned = phone.trim().replace(/[\s\-\.]/g, "");

  if (_cleaned.startsWith("0")) _cleaned = "+84" + _cleaned.substring(1);
  if (_cleaned.startsWith("84") && !_cleaned.startsWith("+"))
    _cleaned = "+" + _cleaned;

  const _phoneWithoutCountryCode = _cleaned.replace(/^\+84/, "");
  const _formattedBody = _phoneWithoutCountryCode.replace(
    /(\d{3})(?=\d)/g,
    "$1 ",
  );

  return `(+84) ${_formattedBody}`;
}

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

async function sendConfirmRSVP(_payload) {
  try {
    const _sheet =
      "https://script.google.com/macros/s/AKfycbwam0nPVYfrPqbIUnH4aehfsuOC1MkRSmcpT9ZGg88ExiTS2PSFu5WV2lqPSfzXpzBl/exec";
    return await fetch(_sheet, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: new URLSearchParams({
        GuestName: _payload?.guestName,
        GuestPhone: formatVietnamesePhoneNumber(_payload?.guestPhone),
        GuestRelation: _payload?.guestRelation,
        Attendance: _payload?.attendance,
        GuestCount: _payload?.guestCount,
        CreatedAt: toLocalTime(new Date()),
      }),
    });
  } catch (error) {
    throw error;
  }
}
