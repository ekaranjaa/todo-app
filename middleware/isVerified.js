export default function ({ route, $auth, redirect }) {
  if (
    $auth.loggedIn &&
    !$auth.user.email_verified &&
    route.name !== 'verify-email'
  ) {
    redirect('/verify-email');
  }

  if (
    route.name === 'verify-email' &&
    $auth.loggedIn &&
    $auth.user.email_verified
  ) {
    redirect('/');
  }
}
