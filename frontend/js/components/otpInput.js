/**
 * Griham Design System - Reusable 6-Digit OTP Input Component
 * File: js/components/otpInput.js
 */

const GrihamOtpInput = {
  /**
   * Render standardized 6-digit OTP input boxes HTML markup
   * @param {Object} options
   */
  render(options = {}) {
    const {
      count = 6,
      containerId = 'otp-digit-container',
      prefix = 'otp-digit-',
      customClass = 'otp-input-container',
      inputClass = 'otp-digit-input'
    } = options;

    const inputs = [];
    for (let i = 0; i < count; i++) {
      const isFirst = i === 0;
      inputs.push(`
        <input
          type="tel"
          inputmode="numeric"
          class="${inputClass}"
          maxlength="1"
          pattern="[0-9]*"
          id="${prefix}${i}"
          data-index="${i}"
          ${isFirst ? 'autocomplete="one-time-code"' : ''}
          aria-label="Digit ${i + 1} of ${count}"
          required
        >
      `.trim());
    }

    return `
      <div class="${customClass}" id="${containerId}">
        ${inputs.join('\n        ')}
      </div>
    `.trim();
  },

  /**
   * Initialize interactive OTP behavior (auto-advance, backspace, paste, completion)
   * @param {string|HTMLElement} container
   * @param {Object} [options]
   */
  init(container, options = {}) {
    const containerEl = typeof container === 'string' ? document.getElementById(container) : container;
    if (!containerEl) return;

    const inputs = Array.from(containerEl.querySelectorAll('input'));
    if (!inputs.length) return;

    inputs.forEach((input, index) => {
      input.value = '';
      input.classList.remove('field-error');

      input.oninput = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        e.target.value = val ? val[val.length - 1] : '';

        inputs.forEach(i => i.classList.remove('field-error'));

        if (typeof options.onInput === 'function') {
          options.onInput(e.target.value, this.getValue(containerEl), index);
        }

        if (e.target.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }

        const currentOtp = this.getValue(containerEl);
        if (currentOtp.length === inputs.length && typeof options.onComplete === 'function') {
          options.onComplete(currentOtp);
        }
      };

      input.onkeydown = (e) => {
        if (e.key === 'Backspace') {
          if (!input.value && index > 0) {
            inputs[index - 1].focus();
            inputs[index - 1].value = '';
            e.preventDefault();
          } else {
            input.value = '';
          }
        } else if (e.key === 'ArrowLeft' && index > 0) {
          inputs[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      };

      input.onpaste = (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
        if (pasteData) {
          for (let i = 0; i < inputs.length && i < pasteData.length; i++) {
            inputs[i].value = pasteData[i];
          }
          const nextIndex = Math.min(pasteData.length, inputs.length) - 1;
          if (inputs[nextIndex]) inputs[nextIndex].focus();

          const currentOtp = this.getValue(containerEl);
          if (currentOtp.length === inputs.length && typeof options.onComplete === 'function') {
            options.onComplete(currentOtp);
          }
        }
      };
    });
  },

  /**
   * Get the joined OTP string from container inputs
   * @param {string|HTMLElement} container
   * @returns {string}
   */
  getValue(container) {
    const containerEl = typeof container === 'string' ? document.getElementById(container) : container;
    if (!containerEl) return '';
    const inputs = Array.from(containerEl.querySelectorAll('input'));
    return inputs.map(i => i.value).join('');
  },

  /**
   * Clear all OTP inputs in container
   * @param {string|HTMLElement} container
   */
  clear(container) {
    const containerEl = typeof container === 'string' ? document.getElementById(container) : container;
    if (!containerEl) return;
    const inputs = Array.from(containerEl.querySelectorAll('input'));
    inputs.forEach(i => {
      i.value = '';
      i.classList.remove('field-error');
    });
  },

  /**
   * Set focus to a specific OTP input index (defaults to first)
   * @param {string|HTMLElement} container
   * @param {number} [index=0]
   */
  focus(container, index = 0) {
    const containerEl = typeof container === 'string' ? document.getElementById(container) : container;
    if (!containerEl) return;
    const inputs = Array.from(containerEl.querySelectorAll('input'));
    if (inputs[index]) inputs[index].focus();
  }
};

window.GrihamOtpInput = GrihamOtpInput;
