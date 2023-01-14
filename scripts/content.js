let approveBtn = undefined;
let approveBtnSpan = undefined;
let approveBtnSpanLabel = undefined;
let notYetApproved = undefined;
let lgtmLabel = undefined;

const approveBtnClickListener = addComment('LGTM');

window.addEventListener("load", scanAndSetup);

function scanAndSetup() {
  const intervalMs = 3 * 1000;  
  const doOrDont = () => {
    const attempted = attemptRename();
    if (attempted) {
      clearInterval(interval);
    }
  }
  const interval = setInterval(doOrDont, intervalMs);
}

function getApproveBtn() {
  return document.querySelector('button[data-qa-selector=approve_button]');
}

function attemptRename() {
  approveBtn = getApproveBtn();
  approveBtnSpan = approveBtn?.querySelector('span');
  approveBtnSpanLabel = approveBtnSpan?.innerText;
  notYetApproved = 'Approve' === approveBtnSpanLabel || 'Approve additionally' === approveBtnSpanLabel;
  
  if (notYetApproved) {
    lgtmLabel = 'Look Good To Me! ' + approveBtnSpanLabel
    approveBtnSpan.textContent = lgtmLabel;
    approveBtn.addEventListener('click', approveBtnClickListener);
    approveBtn.addEventListener('click', toggleLabel);
  }
  return !!approveBtn;
}

function toggleLabel() {
  if (approveBtnSpan.textContent === lgtmLabel) {
    approveBtnSpan.textContent = 'Revoke approval';
  } else if (approveBtnSpan.textContent === 'Revoke approval') {
    approveBtnSpan.textContent = approveBtnSpanLabel;
  }
}

function addComment(text) {
  return exactlyOnce(() => {
    const commentTA = document.querySelector('#note-body');
    commentTA.value = text;
    commentTA.dispatchEvent(new Event('change'));
    
    setTimeout(() => {
      const commentBtn = document.querySelector('div[data-qa-selector=comment_button]>button');
      commentBtn.click();
    }, 500);
  });
}

function exactlyOnce(func) {
  let executed = false;
  return () => {
    if (executed) return;

    executed = true;
    func();
  }
}