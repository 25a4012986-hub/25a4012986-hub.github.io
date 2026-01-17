function calculateResult() {
  let total = 0;

  /* ================= I. HỌC TẬP & NCKH (MAX 20) ================= */
  let section1 = 0;

  // 1.1 GPA (max 15)
  const gpaScores = [15, 14, 10, 7, 5];
  document.querySelectorAll('input[name="gpa"]').forEach((el, i) => {
    if (el.checked) section1 += gpaScores[i];
  });

  // 1.2 Hoạt động khoa học (MAX 5)
let science = 0;

/* 3 hoạt động khoa học (checkbox 5 điểm) */
document.querySelectorAll('.science-checkbox').forEach(cb => {
  if (cb.checked) science += 5;
});

/* Sinh hoạt khoa học (radio 1–3 điểm) */
const seminarScores = [1, 2, 3];
document.querySelectorAll('input[name="seminar"]').forEach((el, i) => {
  if (el.checked) science += seminarScores[i];
});

/* Tutor / trợ giảng (+3) */
if (document.querySelector('.tutor-checkbox')?.checked) {
  science += 3;
}

/* Ép trần */
science = Math.min(science, 5);

/* Cộng vào mục 1 */
section1 += science;
total += Math.min(section1, 20);
  /* ================= II. CHẤP HÀNH QUY CHẾ (MAX 25) ================= */
  let section2 = 0;
  const ruleScores = [25, 20, 10, 0];
  document.querySelectorAll('input[name="rule"]').forEach((el, i) => {
    if (el.checked) section2 = ruleScores[i];
  });
  total += section2;

  /* ================= III. HOẠT ĐỘNG HVNH (MAX 20) ================= */
  let section3 = 0;
  const activityScores = [10, 15, 20];
  document.querySelectorAll('input[name="activity"]').forEach((el, i) => {
    if (el.checked) section3 = activityScores[i];
  });
  total += section3;

  /* ================= IV. CÔNG DÂN & CỘNG ĐỒNG (MAX 25) ================= */
  let section4 = 0;

  const citizenScores = [20, 0];
  document.querySelectorAll('input[name="citizen"]').forEach((el, i) => {
    if (el.checked) section4 += citizenScores[i];
  });

  const communityScores = [5, 0];
  document.querySelectorAll('input[name="community"]').forEach((el, i) => {
    if (el.checked) section4 += communityScores[i];
  });

  total += Math.min(section4, 25);

  /* ================= V. CÁN BỘ – ĐOÀN – HỘI (MAX 10) ================= */
  let section5 = 0;

  const getRadioScore = (name, scores) => {
    let s = 0;
    document.querySelectorAll(`input[name="${name}"]`).forEach((el, i) => {
      if (el.checked) s = scores[i];
    });
    return s;
  };

  section5 = Math.max(
    getRadioScore("level_khoa", [10]),
    getRadioScore("leader", [10, 8, 0]),
    getRadioScore("deputy", [8, 6, 0]),
    getRadioScore("member", [6, 4, 0])
  );

  total += Math.min(section5, 10);

/* ================= VI. ĐIỂM CỘNG (TỐI ĐA 10) ================= */

/* 1️⃣ Giải thưởng NCKH – lấy mức CAO NHẤT */
let bonusAward = 0;
const awardScores = [10, 8, 6, 5, 4, 4, 3, 2, 1];

document.querySelectorAll('input[name="award_nckh"]').forEach((el, i) => {
  if (el.checked) {
    bonusAward = Math.max(bonusAward, awardScores[i]);
  }
});

/* 2️⃣ Giấy khen – lấy mức CAO NHẤT */
let bonusCert = 0;
const certScores = [10, 8, 4, 2];

document.querySelectorAll('input[name="certificate"]').forEach((el, i) => {
  if (el.checked) {
    bonusCert = Math.max(bonusCert, certScores[i]);
  }
});

/* 3️⃣ Trường hợp đặc biệt (cộng dồn) */
let bonusSpecial = 0;

if (document.getElementById("sv_khuyet_tat")?.checked) {
  bonusSpecial += 2;
}

if (document.getElementById("vuon_len_hoc_tap")?.checked) {
  bonusSpecial += 2;
}

/* 4️⃣ Tổng điểm cộng (ÉP TRẦN = 10) */
let bonus = bonusAward + bonusCert + bonusSpecial;
bonus = Math.min(bonus, 10);

/* ================= VII. ĐIỂM TRỪ ================= */
let penaltyFixed = 0;

const penalties = document.querySelectorAll('input[data-penalty]');

penalties.forEach(cb => {
  if (!cb.checked) return;

  switch (cb.dataset.penalty) {
    case "vo_le":
      penaltyFixed += 5;
      break;
    case "hv1":
      penaltyFixed += 2;
      break;
    case "hv2":
      penaltyFixed += 3;
      break;
    case "hv3":
      penaltyFixed += 4;
      break;
    case "debt":
      penaltyFixed += 4;
      break;
  }
});

/* ================= TỔNG TRƯỚC ÉP ================= */
let finalScore = total + bonus - penaltyFixed;

/* Ép ngưỡng kỷ luật */
if (document.querySelector('[data-penalty="khien_trach"]')?.checked && finalScore > 80) {
  finalScore = 80;
}

if (
  (document.querySelector('[data-penalty="canh_cao"]')?.checked ||
   document.querySelector('[data-penalty="dinh_chi"]')?.checked) &&
  finalScore > 65
) {
  finalScore = 65;
}

/* Giới hạn */
finalScore = Math.max(0, Math.min(finalScore, 100));
;

let rank = "";
if (finalScore >= 90) rank = "Xuất sắc";
else if (finalScore >= 80) rank = "Tốt";
else if (finalScore >= 65) rank = "Khá";
else if (finalScore >= 50) rank = "Trung bình";
else rank = "Yếu";
/* ================= HIỂN THỊ ================= */ document.getElementById("totalScore").innerText = finalScore; document.getElementById("rank").innerText = rank; document.getElementById("resultBox").style.display = "block"; 
/* ================= GHI CHÚ ================= */
const noteBox = document.getElementById("noteBox");
const noteContent = document.getElementById("noteContent");

let noteHTML = "";

if (rank === "Xuất sắc") {
  noteHTML = `
    <p><b>Kết quả rèn luyện của bạn:</b></p>
    <ul>
      <li>Đủ điều kiện xét <b>Học bổng Khuyến khích học tập loại Xuất sắc</b> (nếu GPA tương ứng).</li>
      <li>Có lợi thế cao khi xét học bổng, khen thưởng, biểu dương.</li>
      <li>Được ưu tiên trong xét các hỗ trợ, dịch vụ và cơ hội học thuật.</li>
      <li>Có thể được Học viện xem xét <b>biểu dương, khen thưởng đặc biệt</b>.</li>
    </ul>
  `;
} 
else if (rank === "Tốt") {
  noteHTML = `
    <p><b>Kết quả rèn luyện của bạn:</b></p>
    <ul>
      <li>Đủ điều kiện xét <b>Học bổng Khuyến khích học tập loại Khá, Giỏi</b> (tùy GPA).</li>
      <li>Là tiêu chí ưu tiên khi xét học bổng, khen thưởng nếu GPA bằng nhau.</li>
      <li>Đủ điều kiện tham gia hầu hết các chương trình học bổng, tài trợ.</li>
    </ul>
  `;
} 
else if (rank === "Khá") {
  noteHTML = `
    <p><b>Kết quả rèn luyện của bạn:</b></p>
    <ul>
      <li>Đủ điều kiện xét <b>Học bổng Khuyến khích học tập loại Khá</b> (nếu GPA phù hợp).</li>
      <li>Kết quả rèn luyện được ghi nhận đầy đủ trong hồ sơ sinh viên.</li>
      <li>Đáp ứng yêu cầu xét tốt nghiệp và các quyền lợi học vụ cơ bản.</li>
    </ul>
  `;
} 
else if (rank === "Trung bình") {
  noteHTML = `
    <p><b>Kết quả rèn luyện của bạn:</b></p>
    <ul>
      <li>Kết quả rèn luyện vẫn được ghi nhận và là căn cứ xét tốt nghiệp.</li>
      <li>Chưa đủ điều kiện để xét học bổng và khen thưởng.</li>
      <li>Nên cải thiện điểm rèn luyện ở các học kỳ tiếp theo để mở rộng cơ hội.</li>
    </ul>
  `;
} 
else {
  noteHTML = `
    <p><b>Lưu ý về kết quả rèn luyện:</b></p>
    <ul>
      <li>Nếu xếp loại <b>Yếu/Kém</b> trong hai học kỳ liên tiếp, sinh viên có thể bị tạm ngừng học.</li>
      <li>Nên chủ động cải thiện kết quả rèn luyện ở học kỳ tiếp theo.</li>
    </ul>
  `;
}
noteContent.innerHTML = noteHTML;
noteBox.style.display = "block";}

function openFeedback() {
  window.open(
    "https://forms.gle/tKBiR1BQxvhhBku58", 
    "_blank"
  );
}
/* ================= ĐẾM LƯỢT TRUY CẬP ================= */

fetch("https://api.countapi.xyz/hit/25a4012986-hub.github.io/visits")
  .then(res => res.json())
  .then(data => {
    const viewEl = document.getElementById("viewCount");
    if (viewEl) {
      viewEl.innerText = data.value;
    }
  })
  .catch(() => {
    const viewEl = document.getElementById("viewCount");
    if (viewEl) {
      viewEl.innerText = "—";
    }
  });

