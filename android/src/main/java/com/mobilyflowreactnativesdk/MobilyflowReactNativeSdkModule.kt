package com.mobilyflowreactnativesdk

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
import java.util.UUID
import java.util.concurrent.Executors

@ReactModule(name = MobilyflowReactNativeSdkModule.NAME)
class MobilyflowReactNativeSdkModule(reactContext: ReactApplicationContext) : NativeMobilyflowReactNativeSdkSpec(reactContext) {
  private val _sdkInstances = mutableMapOf<String, MobilyPurchaseSDK>()

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

  override fun instantiate(appId: String, apiKey: String, environment: String, options: ReadableMap?): String {
    val uuid = UUID.randomUUID().toString()

    var realOptions: MobilyPurchaseSDKOptions? = null
    if (options != null) {
      realOptions = MobilyPurchaseSDKOptions(
        options.getArray("languages").toStringArray(),
        options.optBoolean("debug"),
        options.getString("apiURL")
      )
    }

    val realEnvironment = MobilyEnvironment.entries.find { x -> x.value == environment }
    val sdk = MobilyPurchaseSDK(reactApplicationContext, appId, apiKey, realEnvironment!!, realOptions)
    _sdkInstances[uuid] = sdk

    return uuid
  }

  override fun close(uuid: String) {
    _sdkInstances[uuid]!!.close()
  }

  override fun login(uuid: String, externalRef: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val customer = _sdkInstances[uuid]!!.login(externalRef, reactApplicationContext.currentActivity)
        promise.resolve(customer.toReadableMap())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun logout(uuid: String) {
    _sdkInstances[uuid]!!.logout()
  }

  override fun getProducts(uuid: String, identifiers: ReadableArray?, onlyAvailable: Boolean, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val products = _sdkInstances[uuid]!!.getProducts(identifiers.toStringArray(), onlyAvailable)
        promise.resolve(products.toReadableArray())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getSubscriptionGroups(uuid: String, identifiers: ReadableArray?, onlyAvailable: Boolean, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val groups = _sdkInstances[uuid]!!.getSubscriptionGroups(identifiers.toStringArray(), onlyAvailable)
        promise.resolve(groups.toReadableArray())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getSubscriptionGroupById(uuid: String, id: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val groups = _sdkInstances[uuid]!!.getSubscriptionGroupById(id)
        promise.resolve(groups.toReadableMap())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getEntitlementForSubscription(uuid: String, subscriptionGroupId: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val entitlement = _sdkInstances[uuid]!!.getEntitlementForSubscription(subscriptionGroupId)
        promise.resolve(entitlement.toReadableMap())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getEntitlement(uuid: String, productId: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val entitlement = _sdkInstances[uuid]!!.getEntitlement(productId)
        promise.resolve(entitlement.toReadableMap())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getEntitlements(uuid: String, productIds: ReadableArray?, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val entitlements = _sdkInstances[uuid]!!.getEntitlements(productIds.toStringArray())
        promise.resolve(entitlements.toReadableArray())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getExternalEntitlements(uuid: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val entitlements = _sdkInstances[uuid]!!.getExternalEntitlements()
        promise.resolve(entitlements.toReadableArray())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun requestTransferOwnership(uuid: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val status = _sdkInstances[uuid]!!.requestTransferOwnership()
        promise.resolve(status.value)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun openManageSubscription(uuid: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        _sdkInstances[uuid]!!.openManageSubscription()
        promise.resolve(0)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun openRefundDialogForProduct(uuid: String?, productId: String?, promise: Promise) {
    promise.reject("-1", "Not implemented")
  }

  override fun openRefundDialogForTransactionId(uuid: String?, transactionId: String?, promise: Promise) {
    promise.reject("-1", "Not implemented")
  }

  override fun purchaseProduct(uuid: String, productId: String, options: ReadableMap?, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        if (reactApplicationContext.currentActivity == null) {
          throw MobilyException(MobilyException.Type.UNKNOWN_ERROR)
        }

        val sdk = _sdkInstances[uuid]!!

        val purchaseOptions = PurchaseOptions()
        val offerId = options?.getString("offerId")

        val product = sdk.getProductFromCacheWithId(productId)
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

        val status = sdk.purchaseProduct(reactApplicationContext.currentActivity!!, product, purchaseOptions)
        promise.resolve(status.toReadableMap())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun sendDiagnostic(uuid: String) {
      _sdkInstances[uuid]!!.sendDiagnostic()
  }

  override fun getStoreCountry(uuid: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val result = _sdkInstances[uuid]!!.getStoreCountry()
        promise.resolve(result)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun isBillingAvailable(uuid: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val result = _sdkInstances[uuid]!!.isBillingAvailable()
        promise.resolve(result)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun isForwardingEnable(uuid: String, externalRef: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val result = _sdkInstances[uuid]!!.isForwardingEnable(externalRef)
        promise.resolve(result)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getCustomer(uuid: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        val result = _sdkInstances[uuid]!!.getCustomer().toReadableMap()
        promise.resolve(result)
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  override fun getSDKVersion(uuid: String, promise: Promise) {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
      try {
        promise.resolve(_sdkInstances[uuid]!!.getSDKVersion())
      } catch (error: Exception) {
        throwError(error, promise)
      }
    }
  }

  companion object {
    const val NAME = "MobilyflowReactNativeSdk"
  }
}
