package com.mobilyflowreactnativesdk

import android.content.Intent
import android.net.Uri
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.mobilyflow.mobilypurchasesdk.Enums.MobilyEnvironment
import com.mobilyflow.mobilypurchasesdk.Exceptions.MobilyException
import com.mobilyflow.mobilypurchasesdk.Exceptions.MobilyPurchaseException
import com.mobilyflow.mobilypurchasesdk.Exceptions.MobilyTransferOwnershipException
import com.mobilyflow.mobilypurchasesdk.MobilyPurchaseSDK
import com.mobilyflow.mobilypurchasesdk.MobilyPurchaseSDKOptions
import com.mobilyflow.mobilypurchasesdk.Models.Internal.PurchaseOptions
import java.util.concurrent.Executors

@ReactModule(name = MobilyflowReactNativeSdkModule.NAME)
class MobilyflowReactNativeSdkModule(reactContext: ReactApplicationContext) :
  NativeMobilyflowReactNativeSdkSpec(reactContext) {
  private fun throwError(error: Exception, promise: Promise) {
    when (error) {
      is MobilyException -> promise.reject(error.type.ordinal.toString(), error.message, error)
      is MobilyPurchaseException -> promise.reject(error.type.ordinal.toString(), error.message, error)
      is MobilyTransferOwnershipException -> promise.reject(error.type.ordinal.toString(), error.message, error)
      else -> promise.reject("-1", error.message, error)
    }
  }

  override fun getName(): String {
    return NAME
  }

  override fun initialize(appId: String, apiKey: String, environment: String, options: ReadableMap?) {
    var realOptions: MobilyPurchaseSDKOptions? = null
    if (options != null) {
      realOptions = MobilyPurchaseSDKOptions(
        options.getArray("languages").toStringArray(),
        options.optBoolean("debug"),
        options.getString("apiURL")
      )
    }

    val realEnvironment = MobilyEnvironment.entries.find { x -> x.value == environment }
    MobilyPurchaseSDK.initialize(
      reactApplicationContext.currentActivity ?: reactApplicationContext,
      appId,
      apiKey,
      realEnvironment!!,
      realOptions
    )
  }

  override fun close() {
    MobilyPurchaseSDK.close()
  }

  override fun login(externalRef: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val customer = MobilyPurchaseSDK.login(externalRef)
        promise.resolve(customer.toReadableMap())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun logout() {
    MobilyPurchaseSDK.logout()
  }

  override fun getProducts(identifiers: ReadableArray?, onlyAvailable: Boolean, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val products = MobilyPurchaseSDK.getProducts(identifiers.toStringArray(), onlyAvailable)
        promise.resolve(products.toReadableArray())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getSubscriptionGroups(identifiers: ReadableArray?, onlyAvailable: Boolean, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val groups = MobilyPurchaseSDK.getSubscriptionGroups(identifiers.toStringArray(), onlyAvailable)
        promise.resolve(groups.toReadableArray())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getSubscriptionGroupById(id: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val groups = MobilyPurchaseSDK.getSubscriptionGroupById(id)
        promise.resolve(groups.toReadableMap())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getEntitlementForSubscription(subscriptionGroupId: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val entitlement = MobilyPurchaseSDK.getEntitlementForSubscription(subscriptionGroupId)
        promise.resolve(entitlement.toReadableMap())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getEntitlement(productId: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val entitlement = MobilyPurchaseSDK.getEntitlement(productId)
        promise.resolve(entitlement.toReadableMap())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getEntitlements(productIds: ReadableArray?, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val entitlements = MobilyPurchaseSDK.getEntitlements(productIds.toStringArray())
        promise.resolve(entitlements.toReadableArray())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getExternalEntitlements(promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val entitlements = MobilyPurchaseSDK.getExternalEntitlements()
        promise.resolve(entitlements.toReadableArray())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun requestTransferOwnership(promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val status = MobilyPurchaseSDK.requestTransferOwnership()
        promise.resolve(status.value)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun openManageSubscription(promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        MobilyPurchaseSDK.openManageSubscription()
        promise.resolve(0)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun openRefundDialogForProduct(productId: String?, promise: Promise) {
    promise.reject("-1", "Not implemented")
  }

  override fun openRefundDialogForTransactionId(transactionId: String?, promise: Promise) {
    promise.reject("-1", "Not implemented")
  }

  override fun purchaseProduct(productId: String, options: ReadableMap?, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val currentActivity = reactApplicationContext.currentActivity
        if (currentActivity == null) {
          throw IllegalStateException("You cannot call purchaseProduct while activity isn't available")
        }

        val purchaseOptions = PurchaseOptions()
        val offerId = options?.getString("offerId")

        val product = MobilyPurchaseSDK.DANGEROUS_getProductFromCacheWithId(productId)
        if (product == null) {
          throw MobilyPurchaseException(MobilyPurchaseException.Type.PRODUCT_UNAVAILABLE)
        }

        if (offerId != null) {
          if (product.subscription!!.introductoryOffer?.id == offerId) {
            purchaseOptions.setOffer(product.subscription!!.introductoryOffer)
          } else {
            val offer = product.subscription!!.promotionalOffers.find { x -> x.id == offerId }
            if (offer != null) {
              purchaseOptions.setOffer(offer)
            }
          }
        }

        val status =
          MobilyPurchaseSDK.purchaseProduct(currentActivity, product, purchaseOptions)
        promise.resolve(status.toReadableMap())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun sendDiagnostic(promise: Promise) {
    MobilyPurchaseSDK.sendDiagnostic()
    promise.resolve(1)
  }

  override fun getStoreCountry(promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val result = MobilyPurchaseSDK.getStoreCountry()
        promise.resolve(result)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun isBillingAvailable(promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val result = MobilyPurchaseSDK.isBillingAvailable()
        promise.resolve(result)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun isForwardingEnable(externalRef: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val result = MobilyPurchaseSDK.isForwardingEnable(externalRef)
        promise.resolve(result)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getCustomer(promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val result = MobilyPurchaseSDK.getCustomer().toReadableMap()
        promise.resolve(result)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getSDKVersion(promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        promise.resolve(MobilyPurchaseSDK.getSDKVersion())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  companion object {
    const val NAME = "MobilyflowReactNativeSdk"
  }
}
