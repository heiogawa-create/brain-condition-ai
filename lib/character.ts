import type { CharacterStage } from '@/types';

export interface CharacterInfo {
  id: number;
  series: number;
  rank: number;
  name: string;
  emoji: string;
  description: string;
  unlockCondition: string;
  unlockDesc: string;
}

export const ALL_CHARACTERS: CharacterInfo[] = [
  { id: 0,  series: 0, rank: 0, name: 'ブレインたまご',       emoji: '🥚',         description: 'まだ眠っている脳の卵。可能性は無限大！',                                        unlockCondition: '最初から解放',               unlockDesc: 'アプリを始めると解放' },
  { id: 1,  series: 0, rank: 1, name: 'ちびブレイン',         emoji: '🧠',         description: 'ちっちゃな脳みそ。少しずつ動き始めてきた。',                                    unlockCondition: '診断3回',                    unlockDesc: '診断を3回完了する' },
  { id: 2,  series: 0, rank: 2, name: 'ブレインくん',         emoji: '🧠✨',       description: 'キラリと光る知性のかけら。頑張ってるね！',                                      unlockCondition: '診断10回',                   unlockDesc: '診断を10回完了する' },
  { id: 3,  series: 0, rank: 3, name: 'ブレインジュニア',     emoji: '🧠💫',       description: '思考力がぐんぐん育ってきた！',                                                  unlockCondition: '診断20回',                   unlockDesc: '診断を20回完了する' },
  { id: 4,  series: 0, rank: 4, name: 'ブレインマスター',     emoji: '🧠🔥',       description: '脳の使い方がわかってきた頼もしい存在。',                                        unlockCondition: '診断30回',                   unlockDesc: '診断を30回完了する' },
  { id: 5,  series: 0, rank: 5, name: 'ブレインヒーロー',     emoji: '🧠⚡',       description: '脳力全開！どんな課題もこなせる。',                                              unlockCondition: '診断50回',                   unlockDesc: '診断を50回完了する' },
  { id: 6,  series: 0, rank: 6, name: 'ブレインナイト',       emoji: '🧠🛡️',      description: '脳を守るための知識と習慣を身につけた戦士。',                                    unlockCondition: '診断70回',                   unlockDesc: '診断を70回完了する' },
  { id: 7,  series: 0, rank: 7, name: 'ブレインウィザード',   emoji: '🧠🪄',      description: '脳の魔法使い。思考が魔法のように冴えわたる。',                                  unlockCondition: '診断100回',                  unlockDesc: '診断を100回完了する' },
  { id: 8,  series: 0, rank: 8, name: 'ブレインレジェンド',   emoji: '🧠👑',       description: '伝説の脳の持ち主。その知性は光り輝いている。',                                  unlockCondition: '診断150回',                  unlockDesc: '診断を150回完了する' },
  { id: 9,  series: 0, rank: 9, name: 'ブレインゴッド',       emoji: '🧠🌟👑',    description: '脳神の領域。全ての思考が完璧に統合されている。',                                unlockCondition: '診断200回',                  unlockDesc: '診断を200回完了する' },
  { id: 10, series: 1, rank: 0, name: 'ねむりたまご',         emoji: '🥚💤',       description: 'すやすや眠っている卵。夢の中で成長中。',                                        unlockCondition: '良好スコア1回',              unlockDesc: '良好（80点以上）を1回記録する' },
  { id: 11, series: 1, rank: 1, name: 'ねむリス',             emoji: '🐿️💤',      description: 'まだ眠たそう。もう少し休みたい様子。',                                          unlockCondition: '良好スコア3回',              unlockDesc: '良好（80点以上）を3回記録する' },
  { id: 12, series: 1, rank: 2, name: 'すやリス',             emoji: '🐿️🌙',      description: '質の良い眠りを覚えてきた。目覚めがいい！',                                      unlockCondition: '良好スコア5回',              unlockDesc: '良好（80点以上）を5回記録する' },
  { id: 13, series: 1, rank: 3, name: 'ゆめリス',             emoji: '🐿️⭐',      description: '夢の中でも脳が整理されている。最高の睡眠！',                                    unlockCondition: '良好スコア10回',             unlockDesc: '良好（80点以上）を10回記録する' },
  { id: 14, series: 1, rank: 4, name: 'グッドスリーパー',     emoji: '🛌✨',       description: '睡眠の達人。朝の目覚めがいつも爽快！',                                          unlockCondition: '良好スコア20回',             unlockDesc: '良好（80点以上）を20回記録する' },
  { id: 15, series: 1, rank: 5, name: 'ドリームマスター',     emoji: '🌙💫',       description: '夢と現実を自在に行き来する睡眠の達人。',                                        unlockCondition: '良好スコア30回',             unlockDesc: '良好（80点以上）を30回記録する' },
  { id: 16, series: 1, rank: 6, name: 'ムーンウォーカー',     emoji: '🌕🚶',       description: '月明かりの下を歩くような穏やかな睡眠の守護者。',                                unlockCondition: '良好スコア50回',             unlockDesc: '良好（80点以上）を50回記録する' },
  { id: 17, series: 1, rank: 7, name: 'スターゲイザー',       emoji: '🌟🔭',       description: '星を見ながら眠る夢想家。最高の休息を知る者。',                                  unlockCondition: '良好スコア70回',             unlockDesc: '良好（80点以上）を70回記録する' },
  { id: 18, series: 1, rank: 8, name: 'ルナエンジェル',       emoji: '👼🌙',       description: '月の天使。その眠りは奇跡のように深く美しい。',                                  unlockCondition: '良好スコア100回',            unlockDesc: '良好（80点以上）を100回記録する' },
  { id: 19, series: 1, rank: 9, name: 'エターナルドリーマー', emoji: '🌌💤',       description: '永遠の夢の旅人。睡眠の真髄を極めし者。',                                        unlockCondition: '良好スコア150回',            unlockDesc: '良好（80点以上）を150回記録する' },
  { id: 20, series: 2, rank: 0, name: 'うごきたまご',         emoji: '🥚🏃',       description: 'じっとしていられない元気な卵。',                                                unlockCondition: 'ミッション5個',              unlockDesc: 'ミッションを合計5個達成する' },
  { id: 21, series: 2, rank: 1, name: 'あるきリス',           emoji: '🐿️👟',      description: 'とことこ歩くのが大好き。運動の第一歩！',                                        unlockCondition: 'ミッション10個',             unlockDesc: 'ミッションを合計10個達成する' },
  { id: 22, series: 2, rank: 2, name: 'はしリス',             emoji: '🐿️💨',      description: 'ダッシュが得意！スピードアップ中。',                                            unlockCondition: 'ミッション20個',             unlockDesc: 'ミッションを合計20個達成する' },
  { id: 23, series: 2, rank: 3, name: 'ジョガーリス',         emoji: '🐿️🏅',      description: 'マイペースで走り続ける継続力の持ち主。',                                        unlockCondition: 'ミッション35個',             unlockDesc: 'ミッションを合計35個達成する' },
  { id: 24, series: 2, rank: 4, name: 'アクティブリス',       emoji: '🐿️⚡',      description: '活力あふれる運動の申し子！',                                                    unlockCondition: 'ミッション50個',             unlockDesc: 'ミッションを合計50個達成する' },
  { id: 25, series: 2, rank: 5, name: 'スポーツリス',         emoji: '🐿️🏆',      description: 'どんな運動もこなす万能アスリート。',                                            unlockCondition: 'ミッション70個',             unlockDesc: 'ミッションを合計70個達成する' },
  { id: 26, series: 2, rank: 6, name: 'マラソンリス',         emoji: '🏃🌈',       description: '42kmも走れる超持久力の持ち主。',                                                unlockCondition: 'ミッション100個',            unlockDesc: 'ミッションを合計100個達成する' },
  { id: 27, series: 2, rank: 7, name: 'アスリートゴッド',     emoji: '🏋️⚡',      description: '肉体と精神が完璧に調和した究極の運動家。',                                      unlockCondition: 'ミッション150個',            unlockDesc: 'ミッションを合計150個達成する' },
  { id: 28, series: 2, rank: 8, name: 'オリンピアン',         emoji: '🥇🌟',       description: '世界最高峰の身体能力を持つ伝説の選手。',                                        unlockCondition: 'ミッション200個',            unlockDesc: 'ミッションを合計200個達成する' },
  { id: 29, series: 2, rank: 9, name: 'ウルトラアクティブ',   emoji: '⚡🏆👑',    description: '究極の活力。その行動力は宇宙をも動かす。',                                      unlockCondition: 'ミッション300個',            unlockDesc: 'ミッションを合計300個達成する' },
  { id: 30, series: 3, rank: 0, name: 'やすみたまご',         emoji: '🥚🧘',       description: 'のんびりと休んでいる穏やかな卵。',                                              unlockCondition: '3日連続',                    unlockDesc: '3日連続で診断する' },
  { id: 31, series: 3, rank: 1, name: 'のんびリス',           emoji: '🐿️😌',      description: 'ゆったりとした時間の使い方が上手。',                                            unlockCondition: '7日連続',                    unlockDesc: '7日連続で診断する' },
  { id: 32, series: 3, rank: 2, name: 'まったリス',           emoji: '🐿️☕',      description: 'まったりタイムの達人。癒しのオーラ全開。',                                      unlockCondition: '14日連続',                   unlockDesc: '14日連続で診断する' },
  { id: 33, series: 3, rank: 3, name: 'ヨガリス',             emoji: '🧘🐿️',      description: '柔軟な体と心を持つヨガの使い手。',                                              unlockCondition: '21日連続',                   unlockDesc: '21日連続で診断する' },
  { id: 34, series: 3, rank: 4, name: 'ゼンリス',             emoji: '☮️🐿️',      description: '禅の境地に近づきつつある静かな存在。',                                          unlockCondition: '30日連続',                   unlockDesc: '30日連続で診断する' },
  { id: 35, series: 3, rank: 5, name: 'マインドフルリス',     emoji: '🌸🐿️',      description: '今この瞬間に集中する瞑想の達人。',                                              unlockCondition: '45日連続',                   unlockDesc: '45日連続で診断する' },
  { id: 36, series: 3, rank: 6, name: 'ピースフルソウル',     emoji: '🕊️✨',      description: '平和な魂の持ち主。その存在だけで癒される。',                                    unlockCondition: '60日連続',                   unlockDesc: '60日連続で診断する' },
  { id: 37, series: 3, rank: 7, name: 'トランキリティ',       emoji: '🌊💆',       description: '静寂の中に宿る究極の安らぎ。',                                                  unlockCondition: '90日連続',                   unlockDesc: '90日連続で診断する' },
  { id: 38, series: 3, rank: 8, name: 'セレニティ',           emoji: '🌅🙏',       description: '完全なる平穏。嵐の中でも揺るがない心の持ち主。',                                unlockCondition: '120日連続',                  unlockDesc: '120日連続で診断する' },
  { id: 39, series: 3, rank: 9, name: 'ニルヴァーナ',         emoji: '🌌🧘👑',    description: '悟りの境地。宇宙と一体化した究極の安らぎ。',                                    unlockCondition: '180日連続',                  unlockDesc: '180日連続で診断する' },
  { id: 40, series: 4, rank: 0, name: 'みどりたまご',         emoji: '🥚🌿',       description: '緑の大地から生まれた自然の子。',                                                unlockCondition: '週平均60点',                 unlockDesc: '週平均スコアが60点以上' },
  { id: 41, series: 4, rank: 1, name: 'はっぱリス',           emoji: '🍃🐿️',      description: '葉っぱが大好き。自然の中で育つ。',                                              unlockCondition: '週平均65点',                 unlockDesc: '週平均スコアが65点以上' },
  { id: 42, series: 4, rank: 2, name: 'もりリス',             emoji: '🌲🐿️',      description: '森の中を自由に駆け回る元気な子。',                                              unlockCondition: '週平均70点',                 unlockDesc: '週平均スコアが70点以上' },
  { id: 43, series: 4, rank: 3, name: 'はなリス',             emoji: '🌸🐿️',      description: '花のような優しさと美しさを持つ。',                                              unlockCondition: '週平均75点',                 unlockDesc: '週平均スコアが75点以上' },
  { id: 44, series: 4, rank: 4, name: 'たいようリス',         emoji: '☀️🐿️',      description: '太陽のように明るく周りを照らす。',                                              unlockCondition: '週平均80点',                 unlockDesc: '週平均スコアが80点以上' },
  { id: 45, series: 4, rank: 5, name: 'にじリス',             emoji: '🌈🐿️',      description: '雨上がりの虹のように希望をもたらす。',                                          unlockCondition: '週平均82点',                 unlockDesc: '週平均スコアが82点以上' },
  { id: 46, series: 4, rank: 6, name: 'フォレストスピリット', emoji: '🌳✨',       description: '森の精霊。自然のエネルギーを操る。',                                            unlockCondition: '週平均85点',                 unlockDesc: '週平均スコアが85点以上' },
  { id: 47, series: 4, rank: 7, name: 'アースガーディアン',   emoji: '🌍💚',       description: '大地を守る守護者。自然と完全に調和している。',                                  unlockCondition: '週平均88点',                 unlockDesc: '週平均スコアが88点以上' },
  { id: 48, series: 4, rank: 8, name: 'ネイチャーゴッド',     emoji: '🌺🌟',       description: '自然神の化身。全ての生き物と心が通じる。',                                      unlockCondition: '週平均90点',                 unlockDesc: '週平均スコアが90点以上' },
  { id: 49, series: 4, rank: 9, name: 'ガイアの子',           emoji: '🌍👑🌿',    description: '地球母神ガイアに選ばれし究極の自然の守護者。',                                  unlockCondition: '週平均95点',                 unlockDesc: '週平均スコアが95点以上' },
  { id: 50, series: 5, rank: 0, name: 'きらきらたまご',       emoji: '🥚⭐',       description: 'ピカピカ光る星の卵。',                                                          unlockCondition: '70点以上1回',                unlockDesc: '70点以上を1回記録する' },
  { id: 51, series: 5, rank: 1, name: 'スターリス',           emoji: '⭐🐿️',      description: '小さな星のような輝きを持つ。',                                                  unlockCondition: '75点以上3回',                unlockDesc: '75点以上を3回記録する' },
  { id: 52, series: 5, rank: 2, name: 'シャイニーリス',       emoji: '✨🐿️',      description: '眩しいくらいに輝いている！',                                                    unlockCondition: '80点以上5回',                unlockDesc: '80点以上を5回記録する' },
  { id: 53, series: 5, rank: 3, name: 'ブライトリス',         emoji: '💡🐿️',      description: '明るい未来を照らす光の持ち主。',                                                unlockCondition: '85点以上5回',                unlockDesc: '85点以上を5回記録する' },
  { id: 54, series: 5, rank: 4, name: 'グローリーリス',       emoji: '🌟🐿️',      description: '栄光に輝く誇り高きリス。',                                                      unlockCondition: '85点以上10回',               unlockDesc: '85点以上を10回記録する' },
  { id: 55, series: 5, rank: 5, name: 'スーパースター',       emoji: '🌠✨',       description: '流れ星のように鮮やかに輝く存在。',                                              unlockCondition: '90点以上5回',                unlockDesc: '90点以上を5回記録する' },
  { id: 56, series: 5, rank: 6, name: 'ノヴァ',               emoji: '💥⭐',       description: '超新星爆発のような圧倒的な輝き。',                                              unlockCondition: '90点以上15回',               unlockDesc: '90点以上を15回記録する' },
  { id: 57, series: 5, rank: 7, name: 'ギャラクシー',         emoji: '🌌⭐',       description: '銀河系を包む無限の輝きを持つ。',                                                unlockCondition: '95点以上5回',                unlockDesc: '95点以上を5回記録する' },
  { id: 58, series: 5, rank: 8, name: 'コズミックスター',     emoji: '🌠👑',       description: '宇宙の真理を知る究極の星の化身。',                                              unlockCondition: '95点以上15回',               unlockDesc: '95点以上を15回記録する' },
  { id: 59, series: 5, rank: 9, name: 'ユニバース',           emoji: '🌌🌟👑',    description: '宇宙そのもの。全ての星の光を内包する究極の存在。',                              unlockCondition: '100点達成',                  unlockDesc: 'スコア100点を達成する' },
  { id: 60, series: 6, rank: 0, name: 'よるたまご',           emoji: '🥚🌙',       description: '夜に産まれた神秘の卵。',                                                        unlockCondition: '夜ミッション3個',            unlockDesc: '夜のミッションを3個達成' },
  { id: 61, series: 6, rank: 1, name: 'よるリス',             emoji: '🌙🐿️',      description: '夜更かしをやめようとしている健気な子。',                                        unlockCondition: '夜ミッション10個',           unlockDesc: '夜のミッションを10個達成' },
  { id: 62, series: 6, rank: 2, name: 'つきリス',             emoji: '🌛🐿️',      description: '月明かりの下でそっと微笑む。',                                                  unlockCondition: '夜ミッション20個',           unlockDesc: '夜のミッションを20個達成' },
  { id: 63, series: 6, rank: 3, name: 'ミッドナイトリス',     emoji: '🕛🐿️',      description: '真夜中でも乱れない生活リズムの持ち主。',                                        unlockCondition: '夜ミッション35個',           unlockDesc: '夜のミッションを35個達成' },
  { id: 64, series: 6, rank: 4, name: 'ナイトオウル',         emoji: '🦉🌙',       description: '夜を制する賢い梟。夜型から朝型へ変身中！',                                      unlockCondition: '夜ミッション50個',           unlockDesc: '夜のミッションを50個達成' },
  { id: 65, series: 6, rank: 5, name: 'ムーンライト',         emoji: '🌕💫',       description: '月の光のように静かで穏やかな存在。',                                            unlockCondition: '夜ミッション70個',           unlockDesc: '夜のミッションを70個達成' },
  { id: 66, series: 6, rank: 6, name: 'ルナティックセージ',   emoji: '🌙🔮',       description: '月の賢者。夜の神秘を全て知っている。',                                          unlockCondition: '夜ミッション100個',          unlockDesc: '夜のミッションを100個達成' },
  { id: 67, series: 6, rank: 7, name: 'クレセントゴッド',     emoji: '🌙✨👑',    description: '三日月の神。夜の世界を司る。',                                                  unlockCondition: '夜ミッション150個',          unlockDesc: '夜のミッションを150個達成' },
  { id: 68, series: 6, rank: 8, name: 'フルムーンキング',     emoji: '🌕👑',       description: '満月の王。夜の全てが意のままになる。',                                          unlockCondition: '夜ミッション200個',          unlockDesc: '夜のミッションを200個達成' },
  { id: 69, series: 6, rank: 9, name: 'エクリプスロード',     emoji: '🌑🌟👑',    description: '日食を支配する究極の夜の君主。',                                                unlockCondition: '夜ミッション300個',          unlockDesc: '夜のミッションを300個達成' },
  { id: 70, series: 7, rank: 0, name: 'ほのおたまご',         emoji: '🥚🔥',       description: 'ちいさな炎を宿した熱い卵。',                                                    unlockCondition: '総EXP500',                   unlockDesc: '合計EXPが500を超える' },
  { id: 71, series: 7, rank: 1, name: 'ほのおリス',           emoji: '🔥🐿️',      description: 'やる気の炎が燃え始めた！',                                                      unlockCondition: '総EXP1000',                  unlockDesc: '合計EXPが1000を超える' },
  { id: 72, series: 7, rank: 2, name: 'ファイアリス',         emoji: '🐿️🔥',      description: '燃え盛る情熱の持ち主。止まらない！',                                            unlockCondition: '総EXP2000',                  unlockDesc: '合計EXPが2000を超える' },
  { id: 73, series: 7, rank: 3, name: 'ブレイズリス',         emoji: '🔥⚡🐿️',   description: '炎と雷を操る激烈な存在。',                                                      unlockCondition: '総EXP3500',                  unlockDesc: '合計EXPが3500を超える' },
  { id: 74, series: 7, rank: 4, name: 'インフェルノリス',     emoji: '🌋🐿️',      description: '火山のような爆発的エネルギーを持つ。',                                          unlockCondition: '総EXP5000',                  unlockDesc: '合計EXPが5000を超える' },
  { id: 75, series: 7, rank: 5, name: 'フレアマスター',       emoji: '🔥🌟',       description: '太陽フレアをも操る炎の使い手。',                                                unlockCondition: '総EXP7500',                  unlockDesc: '合計EXPが7500を超える' },
  { id: 76, series: 7, rank: 6, name: 'フェニックス',         emoji: '🦅🔥',       description: '不死鳥。何度倒れても必ず復活する！',                                            unlockCondition: '総EXP10000',                 unlockDesc: '合計EXPが10000を超える' },
  { id: 77, series: 7, rank: 7, name: 'ドラゴンロード',       emoji: '🐉🔥',       description: '炎のドラゴンを従える伝説の主。',                                                unlockCondition: '総EXP15000',                 unlockDesc: '合計EXPが15000を超える' },
  { id: 78, series: 7, rank: 8, name: 'ソーラーキング',       emoji: '☀️👑🔥',    description: '太陽そのものの力を持つ炎の王。',                                                unlockCondition: '総EXP20000',                 unlockDesc: '合計EXPが20000を超える' },
  { id: 79, series: 7, rank: 9, name: 'ビッグバン',           emoji: '💥🌌👑',    description: '宇宙誕生の爆発。全てのエネルギーの源。',                                        unlockCondition: '総EXP30000',                 unlockDesc: '合計EXPが30000を超える' },
  { id: 80, series: 8, rank: 0, name: 'たからたまご',         emoji: '🥚💎',       description: '宝石のような輝きを秘めた特別な卵。',                                            unlockCondition: 'レベル5達成',                unlockDesc: 'レベル5に到達する' },
  { id: 81, series: 8, rank: 1, name: 'クリスタルリス',       emoji: '💎🐿️',      description: '透き通るような純粋さを持つ。',                                                  unlockCondition: 'レベル10達成',               unlockDesc: 'レベル10に到達する' },
  { id: 82, series: 8, rank: 2, name: 'ルビーリス',           emoji: '❤️💎🐿️',   description: '情熱の赤い宝石のような存在。',                                                  unlockCondition: 'レベル15達成',               unlockDesc: 'レベル15に到達する' },
  { id: 83, series: 8, rank: 3, name: 'サファイアリス',       emoji: '💙💎🐿️',   description: '知性の青い宝石。冷静沈着な判断力を持つ。',                                      unlockCondition: 'レベル20達成',               unlockDesc: 'レベル20に到達する' },
  { id: 84, series: 8, rank: 4, name: 'エメラルドリス',       emoji: '💚💎🐿️',   description: '成長の緑の宝石。可能性が無限に広がる。',                                        unlockCondition: 'レベル25達成',               unlockDesc: 'レベル25に到達する' },
  { id: 85, series: 8, rank: 5, name: 'アメジストセージ',     emoji: '💜🔮',       description: '紫の賢者。直感と論理が融合した存在。',                                          unlockCondition: 'レベル30達成',               unlockDesc: 'レベル30に到達する' },
  { id: 86, series: 8, rank: 6, name: 'ダイヤモンドリス',     emoji: '💎✨🐿️',   description: '最も硬く最も輝く。折れない心の象徴。',                                          unlockCondition: 'レベル40達成',               unlockDesc: 'レベル40に到達する' },
  { id: 87, series: 8, rank: 7, name: 'ジュエルキング',       emoji: '💎👑',       description: '全ての宝石を統べる宝石の王。',                                                  unlockCondition: 'レベル50達成',               unlockDesc: 'レベル50に到達する' },
  { id: 88, series: 8, rank: 8, name: 'エターナルジェム',     emoji: '💎🌟👑',    description: '永遠に輝き続ける究極の宝石。',                                                  unlockCondition: 'レベル60達成',               unlockDesc: 'レベル60に到達する' },
  { id: 89, series: 8, rank: 9, name: 'インフィニティストーン', emoji: '💎🌌👑',  description: '全宇宙の力を秘めた伝説の宝石。',                                                unlockCondition: 'レベル75達成',               unlockDesc: 'レベル75に到達する' },
  { id: 90, series: 9, rank: 0, name: 'おうじたまご',         emoji: '🥚👑',       description: '王家の血筋を持つ高貴な卵。',                                                    unlockCondition: '診断50回＋連続30日',         unlockDesc: '診断50回かつ30日連続を達成' },
  { id: 91, series: 9, rank: 1, name: 'プリンスリス',         emoji: '👑🐿️',      description: '気品あふれる若き王子リス。',                                                    unlockCondition: '診断100回＋ミッション100個', unlockDesc: '診断100回かつミッション100個達成' },
  { id: 92, series: 9, rank: 2, name: 'ノーブルリス',         emoji: '🎖️🐿️',     description: '気高き精神を持つ貴族リス。',                                                    unlockCondition: '週平均80点×4週',             unlockDesc: '週平均80点以上を4週連続維持' },
  { id: 93, series: 9, rank: 3, name: 'ロイヤルガード',       emoji: '🛡️👑',      description: '王を守る最強の守護者。',                                                        unlockCondition: '連続60日＋良好50回',         unlockDesc: '60日連続かつ良好スコア50回達成' },
  { id: 94, series: 9, rank: 4, name: 'グランドマスター',     emoji: '🎓👑',       description: '全ての知識と技を極めた最高師範。',                                              unlockCondition: '診断200回＋ミッション200個', unlockDesc: '診断200回かつミッション200個達成' },
  { id: 95, series: 9, rank: 5, name: 'エンペラーリス',       emoji: '👑⚡🐿️',   description: '電光石火の皇帝リス。その威厳は絶対。',                                          unlockCondition: '総EXP20000＋連続90日',       unlockDesc: 'EXP20000かつ90日連続達成' },
  { id: 96, series: 9, rank: 6, name: 'ディバインキング',     emoji: '👑🌟🔥',    description: '神聖なる王。その治世に争いはない。',                                            unlockCondition: '全系統Rank5以上',            unlockDesc: '全10系統でランク5以上を解放' },
  { id: 97, series: 9, rank: 7, name: 'オムニロード',         emoji: '👑💎🌌',    description: '全てを統べる絶対君主。',                                                        unlockCondition: '診断365回',                  unlockDesc: '診断を365回（1年分）完了する' },
  { id: 98, series: 9, rank: 8, name: 'コズミックエンペラー', emoji: '🌌👑✨',    description: '宇宙を治める銀河皇帝。その力は無限。',                                          unlockCondition: '総EXP50000',                 unlockDesc: '合計EXPが50000を超える' },
  { id: 99, series: 9, rank: 9, name: 'ブレインリス神',       emoji: '🧠🐿️👑🌟', description: '全てを超えた究極の存在。脳と体と心が完全に統一された神の化身。',               unlockCondition: '全100体解放',                unlockDesc: '他の99体を全て解放する' },
];

export const SERIES_INFO: { name: string; emoji: string; theme: string }[] = [
  { name: 'ブレイン系',   emoji: '🧠', theme: '診断回数で解放' },
  { name: 'スリープ系',   emoji: '😴', theme: '良好スコアで解放' },
  { name: 'アクティブ系', emoji: '🏃', theme: 'ミッション達成で解放' },
  { name: 'リラックス系', emoji: '🧘', theme: '連続記録で解放' },
  { name: 'ナチュラル系', emoji: '🌿', theme: '週平均スコアで解放' },
  { name: 'スター系',     emoji: '⭐', theme: '高スコア達成で解放' },
  { name: 'ムーン系',     emoji: '🌙', theme: '夜のミッションで解放' },
  { name: 'ファイア系',   emoji: '🔥', theme: '総EXPで解放' },
  { name: 'ダイヤ系',     emoji: '💎', theme: 'レベルアップで解放' },
  { name: 'クラウン系',   emoji: '👑', theme: '複合条件で解放' },
];

export const CHARACTERS: Record<number, { stage: number; name: string; emoji: string; description: string; unlockCondition: string }> = {
  0: { stage: 0, name: 'ブレインエッグ', emoji: '🥚',       description: '大切に育てると、きっと素敵な姿に…',         unlockCondition: '初回登録時' },
  1: { stage: 1, name: 'ねむリス',       emoji: '🐿️💤',    description: 'まだ眠たそう。もう少し休みたい様子。',       unlockCondition: '診断3回達成' },
  2: { stage: 2, name: 'すっきリス',     emoji: '🐿️✨',    description: '少しずつ元気になってきた！',                 unlockCondition: 'ミッション合計10個達成' },
  3: { stage: 3, name: '集中リス',       emoji: '🐿️📘',    description: '集中力バッチリ！何でもこなせる気分。',       unlockCondition: '7日連続記録達成' },
  4: { stage: 4, name: 'ブレインリス',   emoji: '🧠🐿️👑',  description: '最高のコンディション！脳も体も絶好調！',     unlockCondition: '30日継続＋ミッション100個達成' },
};

export const STAGE_EMOJIS: Record<number, string> = {
  0: '🥚', 1: '🐿️💤', 2: '🐿️✨', 3: '🐿️📘', 4: '🧠🐿️👑',
};

export function getUnlockedCharacterIds(stats: {
  diagnosisCount: number;
  totalMissionsCompleted: number;
  streak: number;
  exp: number;
  level: number;
  goodScoreCount: number;
  highScoreCount75: number;
  highScoreCount80: number;
  highScoreCount85: number;
  highScoreCount90: number;
  highScoreCount95: number;
  perfectScoreCount: number;
  nightMissionsCompleted: number;
  weekAvgScore: number;
  diagnosisHistory: { score: number }[];
}): number[] {
  const unlocked: number[] = [];
  const s = stats;

  for (const char of ALL_CHARACTERS) {
    const { id, series, rank } = char;
    let ok = false;
    switch (series) {
      case 0: ok = [0,3,10,20,30,50,70,100,150,200][rank] <= s.diagnosisCount; break;
      case 1: ok = [1,3,5,10,20,30,50,70,100,150][rank] <= s.goodScoreCount; break;
      case 2: ok = [5,10,20,35,50,70,100,150,200,300][rank] <= s.totalMissionsCompleted; break;
      case 3: ok = [3,7,14,21,30,45,60,90,120,180][rank] <= s.streak; break;
      case 4: ok = [60,65,70,75,80,82,85,88,90,95][rank] <= s.weekAvgScore; break;
      case 5:
        if (rank === 0) ok = s.highScoreCount75 >= 1;
        else if (rank === 1) ok = s.highScoreCount75 >= 3;
        else if (rank === 2) ok = s.highScoreCount80 >= 5;
        else if (rank === 3) ok = s.highScoreCount85 >= 5;
        else if (rank === 4) ok = s.highScoreCount85 >= 10;
        else if (rank === 5) ok = s.highScoreCount90 >= 5;
        else if (rank === 6) ok = s.highScoreCount90 >= 15;
        else if (rank === 7) ok = s.highScoreCount95 >= 5;
        else if (rank === 8) ok = s.highScoreCount95 >= 15;
        else if (rank === 9) ok = s.perfectScoreCount >= 1;
        break;
      case 6: ok = [3,10,20,35,50,70,100,150,200,300][rank] <= s.nightMissionsCompleted; break;
      case 7: ok = [500,1000,2000,3500,5000,7500,10000,15000,20000,30000][rank] <= s.exp; break;
      case 8: ok = [5,10,15,20,25,30,40,50,60,75][rank] <= s.level; break;
      case 9:
        if (rank === 0) ok = s.diagnosisCount >= 50 && s.streak >= 30;
        else if (rank === 1) ok = s.diagnosisCount >= 100 && s.totalMissionsCompleted >= 100;
        else if (rank === 2) ok = s.weekAvgScore >= 80 && s.diagnosisCount >= 28;
        else if (rank === 3) ok = s.streak >= 60 && s.goodScoreCount >= 50;
        else if (rank === 4) ok = s.diagnosisCount >= 200 && s.totalMissionsCompleted >= 200;
        else if (rank === 5) ok = s.exp >= 20000 && s.streak >= 90;
        else if (rank === 6) ok = unlocked.filter(i => ALL_CHARACTERS[i]?.rank >= 5).length >= 10;
        else if (rank === 7) ok = s.diagnosisCount >= 365;
        else if (rank === 8) ok = s.exp >= 50000;
        else if (rank === 9) ok = unlocked.length >= 99;
        break;
    }
    if (ok) unlocked.push(id);
  }
  return unlocked;
}

export function getNextEvolutionCondition(stage: number): string {
  const next = stage + 1;
  if (next > 4) return 'すべて解放済み！';
  return CHARACTERS[next]?.unlockCondition ?? '';
}

export function getLevelProgress(exp: number, level: number): number {
  const levelStart = (level - 1) * 100;
  const levelEnd = level * 100;
  return Math.min(100, Math.round(((exp - levelStart) / (levelEnd - levelStart)) * 100));
}

export function getExpInCurrentLevel(exp: number, level: number): number {
  return exp - (level - 1) * 100;
}
