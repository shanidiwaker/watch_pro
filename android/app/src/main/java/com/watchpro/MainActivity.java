package com.watchpro;


import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.zoontek.rnbootsplash.RNBootSplash;
import android.os.Bundle;
import io.sentry.Sentry;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "watchpro";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    Sentry.captureMessage("testing SDK setup");
    Fresco.initialize(this);
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        RNBootSplash.init(MainActivity.this); // <- initialize the splash screen
        super.loadApp(appKey);
      }
    };
  }
}
