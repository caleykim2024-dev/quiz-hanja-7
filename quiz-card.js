(function(){
  const style=document.createElement('style');
  style.textContent=`
    .quiz-card{display:grid;margin-top:14px;transform-style:preserve-3d}
    .quiz-card.answered{transform:rotateY(180deg)}
    .quiz-face{grid-area:1/1;min-width:0;padding:18px;background:var(--card);border:1px solid var(--line);border-radius:18px;
      backface-visibility:hidden;-webkit-backface-visibility:hidden}
    .quiz-back{transform:rotateY(180deg)}
    .quiz-back h3{margin:0 0 14px;font-size:23px}
    .quiz-back.ok h3{color:var(--ok)} .quiz-back.ng h3{color:var(--ng)}
    .result-question{margin:0 0 16px;color:var(--muted);white-space:pre-wrap;word-break:keep-all}
    .result-question strong{color:var(--ink);font-size:24px;margin-right:8px}
    .result-question .qimg{max-height:180px;object-fit:contain;margin:10px 0 0}
    .answer-row{padding:12px 14px;border-radius:12px;margin-top:10px;white-space:pre-wrap;word-break:keep-all}
    .answer-row span{display:block;font-size:13px;font-weight:700;margin-bottom:2px}
    .answer-row.ok{background:var(--ok-bg)} .answer-row.ng{background:var(--ng-bg)}
    .explanation{margin-top:18px;white-space:pre-wrap;word-break:keep-all}
    .explanation b{display:block;margin-bottom:4px}
    .explanation p{margin:0}
    @media (prefers-reduced-motion:no-preference){
      .quiz-card.flipping{animation:card-flip .5s ease-in-out both}
    }
    @keyframes card-flip{from{transform:rotateY(0)}to{transform:rotateY(180deg)}}
  `;
  document.head.appendChild(style);

  function render(q,picked,isReview,flipping,escapeHtml){
    const e=escapeHtml,answered=picked!=null,ok=answered&&picked===q.answer;
    const choices=q.choices.map((choice,i)=>`<button class="choice" ${answered?'disabled':''} onclick="pick(${i})"><span class="n">${i+1}</span><span class="t">${e(choice)}</span></button>`).join('');
    const back=answered?`<div class="quiz-face quiz-back ${ok?'ok':'ng'}" role="status">
        <h3>${ok?'정답이에요!':'아쉬워요. 정답은 '+(q.answer+1)+'번'}</h3>
        <div class="result-question">${q.big?`<strong>${e(q.big)}</strong>`:''}${e(q.question)}${q.image?`<img class="qimg" src="${e(q.image)}" alt="">`:''}</div>
        <div class="answer-row ${ok?'ok':'ng'}"><span>내가 고른 답 · ${picked+1}번</span>${e(q.choices[picked])}</div>
        ${ok?'':`<div class="answer-row ok"><span>정답 · ${q.answer+1}번</span>${e(q.choices[q.answer])}</div>`}
        ${q.explanation?`<div class="explanation"><b>풀이</b><p>${e(q.explanation)}</p></div>`:''}
      </div>`:'';
    return `<div class="quiz-card ${answered?'answered':''} ${flipping?'flipping':''}">
      <div class="quiz-face quiz-front" ${answered?'aria-hidden="true"':''}>
        <div class="qhead">${isReview?'<span class="tag">복습</span>':''}</div>
        ${q.big?`<div class="bighan" lang="ko">${e(q.big)}</div>`:''}
        <div class="qtext">${e(q.question)}</div>
        ${q.image?`<img class="qimg" src="${e(q.image)}" alt="">`:''}
        <div class="choices">${choices}</div>
      </div>
      ${back}
    </div>`;
  }

  function focus(answered){
    if(answered)document.querySelector('.quiz-card').scrollIntoView({block:'start'});
    else window.scrollTo(0,0);
  }

  window.QuizCard={render,focus};
})();
