/**
 * Motion tokens.
 *
 * Interactive things use springs (interruptible, velocity-aware, always start
 * from the current on-screen value). Expressed as Motion's `bounce` + `duration`,
 * which map to Apple's damping ratio + response.
 */

/** Default for anything a person touches: critically damped (damping 1.0), response ~0.4s. */
export const springDefault = { type: "spring", bounce: 0, duration: 0.4 } as const;

/** Snappier settle for small UI (pills, indicators): damping 1.0, response ~0.3s. */
export const springSnappy = { type: "spring", bounce: 0, duration: 0.3 } as const;

/** Only after a gesture that carried momentum (e.g. a release): damping ~0.8. */
export const springMomentum = { type: "spring", bounce: 0.2, duration: 0.4 } as const;

/** Editorial, non-interactive reveals keep a soft curve. */
export const easeSoft = [0.22, 1, 0.36, 1] as const;
