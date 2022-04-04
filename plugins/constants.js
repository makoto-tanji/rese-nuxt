// 予約時間プルダウン用
const reservationTimeOption = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00"
]
// 予約人数プルダウン用
const  reservationPeopleNumberOption = [
  1,
  2,
  3,
  4,
  5,
  6
]
// TODO
// データベースから取得したい
// ページ内検索エリア用
const areaSearchOption = [
  "全て",
  "東京都",
  "大阪府",
  "福岡県"
]
// ページ内検索ジャンル用
const categorySearchOption = [
  "全て",
  "寿司",
  "焼肉",
  "居酒屋",
  "イタリアン",
  "ラーメン"
]

export default (context, inject) => {
  inject('reservationTimeOption', reservationTimeOption)
  inject('reservationPeopleNumberOption', reservationPeopleNumberOption)
  inject('areaSearchOption', areaSearchOption)
  inject('categorySearchOption', categorySearchOption)
}