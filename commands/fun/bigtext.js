const arr = {
  a: ':regional_indicator_a:',
  b: ':regional_indicator_b:',
  c: ':regional_indicator_c:',
  d: ':regional_indicator_d:',
  e: ':regional_indicator_e:',
  f: ':regional_indicator_f:',
  g: ':regional_indicator_g:',
  h: ':regional_indicator_h:',
  i: ':regional_indicator_i:',
  j: ':regional_indicator_j:',
  k: ':regional_indicator_k:',
  l: ':regional_indicator_l:',
  m: ':regional_indicator_m:',
  n: ':regional_indicator_n:',
  o: ':regional_indicator_o:',
  p: ':regional_indicator_p:',
  q: ':regional_indicator_q:',
  r: ':regional_indicator_r:',
  s: ':regional_indicator_s:',
  t: ':regional_indicator_t:',
  u: ':regional_indicator_u:',
  v: ':regional_indicator_v:',
  w: ':regional_indicator_w:',
  x: ':regional_indicator_x:',
  y: ':regional_indicator_y:',
  z: ':regional_indicator_z:',
  0: ':zero:',
  1: ':one:',
  2: ':two:',
  3: ':three:',
  4: ':four:',
  5: ':five:',
  6: ':six:',
  7: ':seven:',
  8: ':eight:',
  9: ':nine:'
}
module.exports = {
  name: ['bigtext', '큰글씨'],
  category: 'fun',
  description: [
    'changes alphabet and number to big text.',
    '알파벳이나 숫자를 큰 글자로 바꿔줍니다.'
  ],
  run: async (client, message, args) => {
    if(args.join(' ').length > 100) {
      message.channel.send('input is too long.')
      return
    }
    let str = ''
    for (let i = 0; i < args.join(' ').length; i++) {
      if (arr[args.join(' ').charAt(i)] !== undefined)
        str += arr[args.join(' ').charAt(i)]
      else 
        str += args.join(' ').charAt(i)
    }
    message.channel.send(str)
  }
}
