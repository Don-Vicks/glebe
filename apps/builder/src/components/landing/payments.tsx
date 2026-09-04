const providers = ["Paystack", "Flutterwave", "Stripe", "PayPal"];

export function PaymentsSection() {
  return (
    <section className="payments" id="payments">
      <div className="wrap section-tight">
        <div className="payments-inner">
          <div>
            <span className="section-label">Donations, done right</span>
            <h2>Accept donations the way your donors actually pay.</h2>
            <p>
              Paystack and Flutterwave for local giving, Stripe and PayPal for
              international and diaspora donors — all on your own site, with an
              automatic receipt sent the moment a donation clears.
            </p>
            <div className="provider-list">
              {providers.map((provider) => (
                <span key={provider} className="provider-chip">
                  {provider}
                </span>
              ))}
            </div>
          </div>
          <div className="receipt-card" aria-hidden="true">
            <div className="rc-label">Donation receipt</div>
            <div className="rc-org">Hope Foundation</div>
            <div className="receipt-row">
              <span>Donor</span>
              <span>Adaeze O.</span>
            </div>
            <div className="receipt-row">
              <span>Frequency</span>
              <span>Monthly</span>
            </div>
            <div className="receipt-row">
              <span>Amount received</span>
              <span>₦25,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}