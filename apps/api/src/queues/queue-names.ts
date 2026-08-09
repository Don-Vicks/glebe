/**
 * BullMQ queue names (spec §8.7). Centralized so InjectQueue() calls across
 * modules can't typo a queue name into silently creating a second queue.
 */
export const SITE_BUILD_QUEUE = "site-build";
export const DOMAIN_VERIFICATION_QUEUE = "domain-verification";
export const PAYMENTS_QUEUE = "payments";
export const MEDIA_QUEUE = "media";
export const EMAIL_QUEUE = "email";
